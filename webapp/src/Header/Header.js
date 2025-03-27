import {Fragment} from 'react';
import {css, StyleSheet} from 'aphrodite';
import logo from '../assets/logo.jpg';
import {logout} from '../actions/authActions';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import WithLogging from "../HOC/WithLogging";

function Header({ appName, user, logout }) {
  return (
    <Fragment>
      <div className={css(styles['App-header'])} id='App-header'>
        <img src={logo} className={css(styles.headerLogo)} alt="logo"/>
        <h1 className={css(styles.headerTitle)}>{appName}</h1>
      </div>

      {user && (
        <p className={css(styles.logoutSection)} >
          Welcome <b>{user.email}</b> (<a href="#" onClick={logout}>logout</a>)
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
    width: '70px',
    height: 'auto',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#e1003c',
    verticalAlign: 'center',
    marginLeft: '8px',
  },
  logoutSection: {
    padding: '20px',
    fontSize: '1rem',
  },
});

Header.propTypes = {
  appName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  appName: state.ui.get('appName'),
  user: state.auth.get('user'),
});

const mapDispatchToProps = {
  logout,
};

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);
const LoggedHeader = WithLogging(ConnectedHeader);

export { LoggedHeader as Header };
