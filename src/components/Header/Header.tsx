import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContextValue } from '../../state/state';
import { fire } from '../../utils/firebase';
import './Header.scss';

const links = Array.from({ length: 4 }).map((_, id) => ({
  title: `Lorem`,
  id,
}));

export const Header = () => {
  const { currentUser, setCurrentUser, setLoader } = useContextValue();

  const logout = async () => {
    setLoader(true);

    try {
      await fire.auth().signOut();
      setCurrentUser(null);
    } catch (e) {
      console.log(e.message);
      setLoader(false);
    }

    setLoader(false);
  };

  return (
    <header className="header">
      <div className="header__body">
        <nav className="header__nav">
          <ul className="header__list">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {links.map(({ id, title }) => (
              <li key={id}>{title}</li>
            ))}
          </ul>
        </nav>
        {currentUser ? (
          <button
            className="header__button header__button_logout"
            onClick={logout}>
            Log out
          </button>
        ) : (
          <NavLink to="/login">
            <button className="header__button header__button_login">
              Log in
            </button>
          </NavLink>
        )}
      </div>
    </header>
  );
};
