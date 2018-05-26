import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmMessage from '../messages/ConfirmEmailMessage';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        {!this.props.isConfirmed && <ConfirmMessage />}
        <h1>Welcome to Dashboard</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  isConfirmed: !!state.user.isConfirmed;
}

Dashboard.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Dashboard);
