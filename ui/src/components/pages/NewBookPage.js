import React, { Component } from 'react';
import SearchBookForm from '../forms/SearchBookForm';
import { Segment } from 'semantic-ui-react';
import BookForm from '../forms/BookForm';
import axios from 'axios';

export class NewBookPage extends Component {
  state = {
    book: null
  };

  onBookChange = data => {
    this.setState({ book: data });
    axios
      .get(`/books/fetchPages?q=${data.goodreadsId}`)
      .then(res => res.data)
      .then(pages => {
        console.log(pages);
        this.setState({ book: { ...data, pages: pages } });
      });
  };

  onSubmit = data =>
    axios
      .post('/books/', data)
      .then(res => res.data)
      .then(pages => {
        console.log(pages);
        this.setState({ book: { ...data, pages: pages } });
      })
      .then(() => this.props.history.push('/dashboard'));

  render() {
    console.log(this.state.book);
    return (
      <Segment>
        <h1>Add new book to your collection</h1>
        <SearchBookForm onBookChange={this.onBookChange} />
        {this.state.book && (
          <BookForm book={this.state.book} submit={this.onSubmit} />
        )}
      </Segment>
    );
  }
}

export default NewBookPage;
