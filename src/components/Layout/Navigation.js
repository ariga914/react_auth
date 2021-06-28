import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../Store/AuthContext';

import classes from './Navigation.module.css';

const Navigation = () => {
  const authContext = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/" exact>Home</NavLink>
        </li>
        {!authContext.isLoggedIn && 
          <li>
          <NavLink activeClassName={classes.active} to="/login">Login</NavLink>
        </li>
        }
        {!authContext.isLoggedIn &&
          <li>
          <NavLink activeClassName={classes.active} to="/signup">Signup</NavLink>
        </li>
        }
        <li>
            <NavLink activeClassName={classes.active} to="/profile">
                Profile
            </NavLink>
        </li>
        {authContext.isLoggedIn &&
          <li>
          <button onClick={authContext.logout}>Logout</button>
        </li>
        }
      </ul>
    </nav>
  );
};

export default Navigation;
