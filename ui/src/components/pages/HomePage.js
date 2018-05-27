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
    return (
      <div>
        <h1>Home Page</h1>
        <Link to="/login">Login</Link>
        /
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    isAuthenticated: !!state.user.isAuthenticated
  };
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProp, { logout })(HomePage);
