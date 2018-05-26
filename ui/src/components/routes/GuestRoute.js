import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect to="/dashboard" />
          ) : (
            <Component {...props} />
          )
        }
      />
    </div>
  );
};

function mapStateToProps(state) {
  return { isAuthenticated: !!state.user.token };
}

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(GuestRoute);
