import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppBar, Tabs, Tab } from '@material-ui/core';

const navTabs = [
  { name: 'Home', path: '/home' },
  { name: 'Products', path: '/products' },
  { name: 'Cart', path: '/cart' },
];

const Nav = ({ loggedInUser, location: { pathname } }) => {
  const usersMatch =
    !pathname.includes('myaccount') ||
    loggedInUser.id === Number(/[0-9]+/.exec(pathname)[0]);
  const showLoggedIn = loggedInUser.id && usersMatch;

  return (
    <AppBar className="nav" color="secondary">
      <Tabs indicatorColor="primary">
        <Link to="/home" className="nav__link">
          <Tab
            label={
              <img
                src="https://image.flaticon.com/icons/svg/1689/1689081.svg"
                width="60"
                height="60"
              />
            }
          />
        </Link>
        {navTabs.map((tab) => {
          return (
            <Link key={tab.name} to={tab.path} className="nav__link">
              <Tab
                label={tab.name}
                style={{ fontSize: '1.3rem' }}
                className="nav__link__text"
              />
            </Link>
          );
        })}
        ]
        <Link
          to={showLoggedIn ? `/users/${loggedInUser.id}/myaccount` : '/login'}
          className="nav__link"
        >
          <Tab
            label={showLoggedIn ? 'My Account' : 'Log In'}
            style={{ fontSize: '1.3rem' }}
            className="nav__link__text"
          />
        </Link>
      </Tabs>
    </AppBar>
  );
};

const mapStateToProps = ({ loggedInUser }) => ({ loggedInUser });

export default connect(mapStateToProps)(Nav);
