import { BOOKS_FETCHED } from '../types';
import api from '../api';
import axios from 'axios';

export const booksFetched = books => ({
  type: BOOKS_FETCHED,
  books
});

export const fetchBooks = () => dispatch =>
  api.book.fetchBooks().then(books => dispatch(booksFetched(books)));
