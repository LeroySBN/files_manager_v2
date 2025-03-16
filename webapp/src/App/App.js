import React, {useContext} from 'react';
import PropTypes from "prop-types";
import $ from 'jquery';
import {css, StyleSheet} from 'aphrodite';
import {connect, useStore} from "react-redux";

// Import components
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import {AppContext} from './AppContext';
import Logo from "../Logo/Logo";
import {Login} from "../Login/Login";
import {Signup} from "../Signup/Signup";
import Header from "../Header/Header";
import Notifications from "../Notifications/Notifications";

// Import dispatch action creators
import {
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
} from "../actions/uiActionCreators";

import {getLatestNotification} from "../utils/utils";

const listCourses = [
  { id: 1, name: "ES6", credit: 60 },
  { id: 2, name: "Webpack", credit: 20 },
  { id: 3, name: "React", credit: 40 },
];

const listNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: getLatestNotification() },
];

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginView: true,
      // user: user,
      listCourses: listCourses,
      listNotifications: listNotifications,
    };

    // Bind methods for event handling
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
  }

  componentDidMount() {
    $(document).on('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    $(document).off('keydown', this.handleKeyPress);
  }

  // Logout shortcut
  handleKeyPress(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.boundLogout();
    }
  }

  // Notification management
  markNotificationAsRead = (id)=> {
    this.setState({
      listNotifications: this.state.listNotifications.filter(
          (notification)=> notification.id !== id
      )
    });
  };

  // Toggle between Login and Signup views
  toggleToSignup = () => {
    this.setState({ isLoginView: false });
  }

  toggleToLogin = () => {
    this.setState({ isLoginView: true });
  }

  // logOut = ()=> {
  //   this.props.logout();
  // }

  handleLogout = () => {
    const { boundLogout } = this.props;
    boundLogout();
  };

  // logOut = () => {
  //   const boundLogout = this.props.boundLogout;
  //   boundLogout();
  // }

  handleDisplayDrawer = () => {
    const {boundDisplayNotificationDrawer} = this.props;
    boundDisplayNotificationDrawer();
  }

  handleHideDrawer = () => {
    const {boundHideNotificationDrawer} = this.props;
    boundHideNotificationDrawer();
  }

  render() {
    console.log(this.state);

    const {
      isLoggedIn,
      displayDrawer,
      user
    } = this.props;

    return (
        <AppContext.Provider
          value={{
            user: user,
            logOut: this.handleLogout,
          }}
        >
          <React.Fragment>
            <div className={css(styles.App)}>
              {isLoggedIn ? (
                <div className={css(styles.Dashboard)}>
                  <Header />
                  <Notifications
                      displayDrawer={displayDrawer}
                      listNotifications={this.state.listNotifications}
                      handleDisplayDrawer={this.handleDisplayDrawer}
                      handleHideDrawer={this.handleHideDrawer}
                      markNotificationAsRead={this.markNotificationAsRead}
                  />
                  <BodySectionWithMarginBottom title="File list">
                    <CourseList listCourses={this.state.listCourses} />
                  </BodySectionWithMarginBottom>
                  <Footer/>
                </div>
              ) : (
                <div className={css(styles['Access-container'])}>
                  <Logo />
                  {this.state.isLoginView ? (
                      <Login
                          // logIn={logIn}
                          showSignup={this.toggleToSignup}
                      />
                  ) : (
                      <Signup
                          // signUp={signUp}
                          showLogin={this.toggleToLogin}
                      />
                  )}
                </div>
              )}
            </div>
          </React.Fragment>
        </AppContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  App: {
    fontFamily: 'Courier New, Courier, monospace',
    background: 'linear-gradient(0deg, #3d85c677, #fff8f8)',
    height: '100vh',
  },
  Dashboard: {
    position: 'relative',
  },
  ['Access-container']: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '50px',
  },
})

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  boundLogout: PropTypes.func,
  displayDrawer: PropTypes.bool,
  user: PropTypes.object,
  boundDisplayNotificationDrawer: PropTypes.func,
  boundHideNotificationDrawer: PropTypes.func,
};

App.defaultProps = {
  isLoggedIn: false,
  boundLogout: () => {},
  displayDrawer: false,
  user: null,
  boundDisplayNotificationDrawer: () => {},
  boundHideNotificationDrawer: () => {},
}

export function mapStateToProps (state) {
  console.log(state);
  return {
    isLoggedIn: state.isUserLoggedIn,
    displayDrawer: state.displayDrawer,
    user: state.user,
  };
}

const mapDispatchToProps = (dispatch) => ({
  boundLogout: () => dispatch(logout()),
  boundDisplayNotificationDrawer: () => dispatch(displayNotificationDrawer()),
  boundHideNotificationDrawer: () => dispatch(hideNotificationDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
