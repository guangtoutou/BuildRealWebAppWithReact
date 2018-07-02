import React from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const TopNavigation = ({ books, logout }) => {
  return (
    <Menu secondary pointing>
      <Menu.Item as={Link} to="/dashboard">
        Dashboard
      </Menu.Item>
      {books.length > 0 && (
        <Menu.Item as={Link} to="/books/new">
          Add new book
        </Menu.Item>
      )}

      <Menu.Menu position="right">
        <Dropdown
          trigger={<Image avatar src={gravatarUrl('ni.ningning@gmail.com')} />}
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

function mapStateToProps(state) {
  return {
    books: state.books
  };
}

TopNavigation.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { logout })(TopNavigation);
