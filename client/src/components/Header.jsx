/** @format */

import React from "react";
import "./Header.css";
import { observer, inject } from "mobx-react";

function Header({ user, onLogout }) {
  return (
    <header className='header'>
      <i className='fab fa-github'></i>
      {user.userName !== "" ? (
        <div className='header__user'>
          {user.userName}
          <img src={user.avatarUrl} alt='avatar' className='header__avatar' />
        </div>
      ) : (
        <h1 className='header__title'>Mithub</h1>
      )}
      <div className='header__column'>
        {user.userName !== "" ? (
          <div className='header__login' onClick={() => onLogout()}>
            Log out
          </div>
        ) : (
          <div className='header__login'>
            <a href='https://github.com/login/oauth/authorize?client_id=9a6ea7a86628a58bedee&scope=user'>
              Sign in
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export default inject(({ user }) => ({
  user: user.userInfo,
  onLogout: user.logout,
}))(observer(Header));
