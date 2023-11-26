const resolvers = {
  Query: {
    me: async (parent, { username, id }, context) => {
      try {
        const foundUser = await User.findOne({
          $or: [{ _id: id }, { username: username }],
        });

        if (!foundUser) {
          throw new Error('Cannot find a user with this id!');
        }

        return foundUser;
      } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the user.');
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the user.');
      }
    },
    login: async (parent, { username, password }) => {
      try {
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) {
          throw new Error("Can't find this user");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new Error('Wrong password!');
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error('An error occurred while logging in.');
      }
    },
    saveBook: async (parent, { bookData }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: bookData } },
            { new: true, runValidators: true }
          );
          return updatedUser;
        }
        throw new Error('You need to be logged in!');
      } catch (error) {
        console.error(error);
        throw new Error('An error occurred while saving the book.');
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
          return updatedUser;
        }
        throw new Error('You need to be logged in!');
      } catch (error) {
        console.error(error);
        throw new Error('An error occurred while removing the book.');
      }
    },
  },
};
module.exports = resolvers;