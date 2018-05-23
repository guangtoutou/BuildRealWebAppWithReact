import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Button } from 'semantic-ui-react';

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
        <Button primary onClick={this.logout}>
          Logout
        </Button>
      );
    }
  }
}

function mapStateToProp(state) {
  return {
    isAuthenticated: !!state.user.isAuthenticated
  };
}

export default connect(mapStateToProp, { logout })(HomePage);
