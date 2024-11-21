import React, { Fragment } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { AppContext } from '../App/AppContext';
import logo from '../assets/holberton-logo.jpg';

export default function Header() {
  const { user, logOut } = React.useContext(AppContext);

  return (
    <Fragment>
      <div className={css(styles['App-header'])} id='App-header'>
        <img src={logo} className={css(styles.headerLogo)} alt="logo"/>
        <h1 className={css(styles.headerTitle)}>School dashboard</h1>
      </div>

      {user.isLoggedIn && (
        <p id="logoutSection">
          Welcome <b>{user.email}</b> (<a href="#" onClick={logOut}>logout</a>)
        </p>
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  'App-header': {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Lora, serif',
    borderBottom: '3px solid #e1003c',
    zIndex: '2',
  },
  headerLogo: {
    width: '200px',
    height: '200px',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#e1003c',
    verticalAlign: 'center',
  },
});
