import { LOGIN_USER, ADD_USER, SAVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

export const getMe = (token) => {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: GET_ME,
    }),
  })
    .then(response => response.json());
};

export const createUser = (userData) => {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mutation: ADD_USER,
      variables: userData,
    }),
  })
    .then(response => response.json());
};

export const loginUser = (userData) => {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mutation: LOGIN_USER,
      variables: userData,
    }),
  })
    .then(response => response.json());
};

export const saveBook = (bookData, token) => {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mutation: SAVE_BOOK,
      variables: { input: bookData },
    }),
  })
    .then(response => response.json());
};
// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
