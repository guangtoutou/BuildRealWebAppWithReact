import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgetPassword } from '../../actions/auth';
import { Message, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ForgetPasswordForm from '../forms/ForgetPasswordForm';
import api from '../../api';

class ForgetPasswordPage extends React.Component {
  state = {
    success: false
  };

  submit = data =>
    this.props
      .forgetPassword(data)
      .then(() => this.setState({ success: true }));
  render() {
    return (
      <div>
        {this.state.success ? (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>
                An email has been send to your mailbox. Please check your
                mailbox to reset your password.
              </Message.Header>
              <Link to="/login">Back to login page</Link>
            </Message.Content>
          </Message>
        ) : (
          <ForgetPasswordForm submit={this.submit} />
        )}
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    isAuthenticated: !!state.user.isAuthenticated
  };
}

ForgetPasswordPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProp, { forgetPassword })(ForgetPasswordPage);
