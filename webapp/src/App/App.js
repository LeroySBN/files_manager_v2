import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';
import { logout, checkAuth, clearAuthMessage } from '../actions/authActions';
import { Login } from '../Login/Login';
import { Signup } from '../Signup/Signup';
import Logo from '../Logo/Logo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginView: true,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.props.checkAuth();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logout();
    }
  };

  toggleToSignup = () => {
    this.props.clearAuthMessage();
    this.setState({ isLoginView: false });
  };

  toggleToLogin = () => {
    this.props.clearAuthMessage();
    this.setState({ isLoginView: true });
  };

  render() {
    const { isLoggedIn, logout } = this.props;
    const { isLoginView } = this.state;

    return (
      <div className={css(styles.App)}>
        {isLoggedIn ? (
          <div className={css(styles.Dashboard)}>
            <h1>Files Dashboard</h1>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className={css(styles.AccessContainer)}>
            <Logo />
            {isLoginView ? (
              <Login showSignup={this.toggleToSignup} />
            ) : (
              <Signup showLogin={this.toggleToLogin} />
            )}
          </div>
        )}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  App: {
    fontFamily: 'Inter, sans-serif',
    background: 'linear-gradient(0deg, #3d85c677, #fff8f8)',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
  },
  Dashboard: {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  AccessContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: 'transparent',
  },
});

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  checkAuth: PropTypes.func,
  clearAuthMessage: PropTypes.func,
};

App.defaultProps = {
  isLoggedIn: false,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.get('isLoggedIn'),
});

const mapDispatchToProps = {
  logout,
  checkAuth,
  clearAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
