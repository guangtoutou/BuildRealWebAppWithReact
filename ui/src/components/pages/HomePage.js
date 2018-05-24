import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class HomePage extends React.Component {
  logout = () => this.props.logout();

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <div>
          <h1>Home Page</h1>
          <Link to="/login">Login</Link>
          /
          <Link to="/signup">Sign Up</Link>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Home Page</h1>
          <Button primary onClick={this.logout}>
            Logout
          </Button>
        </div>
      );
    }
  }
}

function mapStateToProp(state) {
  return {
    isAuthenticated: !!state.user.isAuthenticated
  };
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func
};

export default connect(mapStateToProp, { logout })(HomePage);
