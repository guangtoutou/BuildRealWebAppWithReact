import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmMessage from '../messages/ConfirmEmailMessage';
import AddBookCtA from '../cta/AddBookCtA';
import { fetchBooks } from '../../actions/book';
import BookCard from '../forms/BookCard';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    console.log(this.props.books);

    return (
      <div>
        {!this.props.isConfirmed && <ConfirmMessage />}
        <h1>Welcome to Dashboard</h1>
        {this.props.books.length === 0 && <AddBookCtA />}
        {this.props.books.length > 0 &&
          this.props.books.map(book => <BookCard book={book} />)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.isConfirmed,
    books: state.books
  };
}

Dashboard.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired,
  fetchBooks: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchBooks })(Dashboard);
