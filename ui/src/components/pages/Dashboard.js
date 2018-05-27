import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmMessage from '../messages/ConfirmEmailMessage';
import AddBookCtA from '../cta/AddBookCtA';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        {!this.props.isConfirmed && <ConfirmMessage />}
        <h1>Welcome to Dashboard</h1>
        {!!this.props.books && <AddBookCtA />}
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
  isConfirmed: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Dashboard);
