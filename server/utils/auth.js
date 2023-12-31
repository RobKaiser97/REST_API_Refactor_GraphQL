const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh'; // Secret key used for signing JWT tokens
const expiration = '2h'; // Token expiration time


module.exports = {
  // Middleware to handle authentication
  authMiddleware: function ({ req }) {
    // Allow token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      // Verify and decode the token
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  // Function to sign a JWT token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // Sign the token with the payload, secret, and expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};