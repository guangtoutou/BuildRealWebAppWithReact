import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

function mapStateToProps(state) {
  return { isAuthenticated: !!state.user.isAuthenticated };
}

UserRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(UserRoute);
