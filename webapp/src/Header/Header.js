import {Fragment} from 'react';
import {css, StyleSheet} from 'aphrodite';
import {logout} from '../actions/authActions';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import WithLogging from "../HOC/WithLogging";

function Header({ appName, user, logout }) {
  return (
    <Fragment>
      <div className={css(styles['App-header'])} id='App-header'>
        <div className={`${css(styles.headerContainer)} container`}>
          <h1 className={css(styles.headerTitle)}>{appName}</h1>
          {user && (
              <p className={css(styles.logoutSection)} >
                Welcome <b>{user.email}</b> (<a href="#" onClick={logout}>logout</a>)
              </p>
          )}
        </div>
      </div>

    </Fragment>
  );
}

const styles = StyleSheet.create({
  'App-header': {
    fontFamily: 'Lora, serif',
    borderBottom: '3px solid #e1003c',
    zIndex: '2',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#e1003c',
    verticalAlign: 'center',
  },
  logoutSection: {
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
