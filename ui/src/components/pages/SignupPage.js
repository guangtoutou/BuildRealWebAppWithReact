import React from 'react';
import SignupForm from '../forms/SignupForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../../actions/auth';

class SignupPage extends React.Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push('/'));

  render() {
    return (
      <div>
        <h1>Sign Up Page</h1>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);
