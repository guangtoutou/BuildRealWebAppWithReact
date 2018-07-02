import { BOOKS_FETCHED } from '../types';

export default function books(state = { books: [] }, action = {}) {
  switch (action.type) {
    case BOOKS_FETCHED:
      return action.books;
    default:
      return state;
  }
}
