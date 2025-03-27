import React from 'react';
import PropTypes from 'prop-types';
import {css, StyleSheet} from 'aphrodite';
import {connect} from 'react-redux';
import {checkAuth, clearAuthMessage} from '../actions/authActions';
import {toggleNotificationDrawer} from "../actions/uiActions";
import {Login} from '../Login/Login';
import {Signup} from '../Signup/Signup';
import Logo from '../Logo/Logo';
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
// import Notifications from "../Notifications/Notifications";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import {FileList} from "../FileList/FileList";

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
    const { isLoggedIn, dashboardTitle } = this.props;
    const { isLoginView } = this.state;

    return (
      <div className={css(styles.App)}>
        {isLoggedIn ? (
            <React.Fragment>
              {/*<Notifications*/}
              {/*    displayDrawer={this.state.displayDrawer}*/}
              {/*    handleDisplayDrawer={this.handleDisplayDrawer}*/}
              {/*    handleHideDrawer={this.handleHideDrawer}*/}
              {/*    markNotificationAsRead={this.markNotificationAsRead}*/}
              {/*/>*/}
              <div className={css(styles.App)}>
                <Header />
                <BodySectionWithMarginBottom title={dashboardTitle}>
                  <FileList />
                </BodySectionWithMarginBottom>
                <Footer />
              </div>
            </React.Fragment>
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
  checkAuth: PropTypes.func,
  clearAuthMessage: PropTypes.func,
  toggleNotificationDrawer: PropTypes.func,
  dashboardTitle: PropTypes.string.isRequired
};

App.defaultProps = {
  isLoggedIn: false,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.get('isLoggedIn'),
  displayDrawer: state.ui.get('isNotificationDrawerVisible'),
  dashboardTitle: state.ui.get('dashboardFocus')
});

const mapDispatchToProps = {
  checkAuth,
  clearAuthMessage,
  toggleNotificationDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
