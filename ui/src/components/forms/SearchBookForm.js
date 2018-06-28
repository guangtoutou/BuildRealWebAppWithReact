import React, { Component } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:8080';

export class SearchBookForm extends Component {
  state = {
    query: '',
    loading: false,
    options: [],
    books: {}
  };

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data
    });
    this.timer = setTimeout(this.fecthoptions, 1000);
  };

  fecthoptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    axios
      .get('/books/search')
      .then(res => res.data)
      .then(books => {
        const options = [];
        const bookHash = {};
        books.forEach(book => {
          bookHash[book.goodreadsId] = book;
          options.push({
            key: book.goodreadsId,
            value: book.goodreadsId,
            text: book.title
          });
        });
        this.setState({ loading: false, options, books: bookHash });
      });
  };

  onChange = (e, data) => {
    this.props.onBookChange(this.state.books[data.value]);
  };

  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a book by title"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

export default SearchBookForm;
