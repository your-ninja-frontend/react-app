import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import Button from '../button/Button'
import { AuthContext } from '../../../context';

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }

  return (
    <nav className={classes.nav}>
      <ul className={classes.nav__list}>
        <li className={classes.nav__item}>
          <Link className={classes.nav__link} to='/about'>About</Link>
        </li>
        <li className={classes.nav__item}>
          <Link className={classes.nav__link} to='/posts'>Posts</Link>
        </li>
      </ul>
      <Button className={classes.nav__logout} onClick={logout}>Выйти</Button>
    </nav>
  );
}

export default Navbar;
