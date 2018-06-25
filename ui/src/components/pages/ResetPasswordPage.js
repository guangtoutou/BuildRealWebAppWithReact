import React from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, resetPassword, validateToken } from '../../actions/auth';
import ResetPasswordForm from '../forms/ResetPasswordForm';

class ResetPasswordPage extends React.Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props.logout();
    this.props
      .validateToken({ token: this.props.match.params.token })
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  submit = data =>
    this.props
      .resetPassword(data)
      .then(() => this.props.history.push('/login'));

  render() {
    const { loading, success } = this.state;
    const token = this.props.match.params.token;

    return (
      <div>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        )}

        {!loading &&
          success && <ResetPasswordForm submit={this.submit} token={token} />}

        {!loading &&
          !success && (
            <Message negative icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>Ooops. Invalid token it seems.</Message.Header>
                <Link to="/">Back to Homepage</Link>
              </Message.Content>
            </Message>
          )}
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  confirmToken: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { logout, resetPassword, validateToken })(
  ResetPasswordPage
);
