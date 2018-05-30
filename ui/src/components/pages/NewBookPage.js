import React, { Component } from 'react';
import SearchBookForm from '../forms/SearchBookForm';
import { Segment } from 'semantic-ui-react';
import BookForm from '../forms/BookForm';

export class NewBookPage extends Component {
  state = {
    book: null
  };

  onBookChange = data => {
    this.setState({ book: data });
  };

  render() {
    console.log(this.state.book);
    return (
      <Segment>
        <h1>Add new book to your collection</h1>
        <SearchBookForm onBookChange={this.onBookChange} />
        {this.state.book && <BookForm book={this.state.book} />}
      </Segment>
    );
  }
}

export default NewBookPage;
