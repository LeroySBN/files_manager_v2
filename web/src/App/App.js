import React from 'react';
import PropTypes from "prop-types";
import $ from 'jquery';
import {css, StyleSheet} from 'aphrodite';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import {getLatestNotification} from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import {AppContext, user} from './AppContext';
import Logo from "../Logo/Logo";
import {Login} from "../Login/Login";
import {Signup} from "../Signup/Signup";
import Header from "../Header/Header";
import Notifications from "../Notifications/Notifications";
import {displayNotificationDrawer, hideNotificationDrawer} from "../actions/uiActionCreators";
import {connect} from "react-redux";

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
      hasJoined: true,
      user: user,
      logOut: this.logOut,
      listNotifications: listNotifications,
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.handleShowSignup = this.handleShowSignup.bind(this);
    this.handleShowLogin = this.handleShowLogin.bind(this);
  }

  componentDidMount() {
    $(document).on('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    $(document).off('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.state.logOut();
    }
  }

  handleShowSignup = () => {
    this.setState({ hasJoined: false });
  }

  handleShowLogin = () => {
    this.setState({ hasJoined: true });
  }

  signUp = (email, password)=> {
    this.setState({ user: { email, password, isLoggedIn: true }})
  }

  logIn = (email, password)=> {
    this.setState({ user: { email, password, isLoggedIn: true }})
  }

  logOut = ()=> {
    this.setState({ user: user})
  }

  markNotificationAsRead = (id)=> {
    this.setState({
      listNotifications: this.state.listNotifications.filter(
          (notification)=> notification.id !== id
      )
    });
  };

render() {
  console.log('App props:', this.props);

  return (
      <AppContext.Provider value={{
        user: this.state.user,
        logOut: this.state.logOut,
      }}>
        <React.Fragment>
          <div className={css(styles.App)}>
            {this.state.user.isLoggedIn ? (
                <div className={css(styles.Dashboard)}>
                  <Notifications
                      displayDrawer={this.props.displayDrawer}
                      listNotifications={this.state.listNotifications}
                      handleDisplayDrawer={this.props.displayNotificationDrawer}
                      handleHideDrawer={this.props.hideNotificationDrawer}
                      markNotificationAsRead={this.markNotificationAsRead}
                  />
                  <Header />
                  <BodySectionWithMarginBottom title="File list">
                    <CourseList listCourses={listCourses} />
                  </BodySectionWithMarginBottom>
                  <Footer/>
                </div>
            ) : (
                <div className={css(styles['Access-container'])}>
                  <Logo />
                  {this.state.hasJoined ? (
                      <Login logIn={this.logIn} handleShowSignup={this.handleShowSignup} />
                  ) : (
                      <Signup signUp={this.signUp} handleShowLogin={this.handleShowLogin} />
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
    minHeight: '100vh',
    fontFamily: 'Courier New, Courier, monospace',
    overflowY: 'hidden',
    background: 'linear-gradient(0deg, #3d85c677, #fff8f8)',
  },
  Dashboard: {
    position: 'relative',
  },
  ['Access-container']: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '50px',
    marginTop: '50px',
    '@media (max-width: 432px)': {
      marginTop: '15vh',
    },
  },
})

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
};

App.defaultProps = {
  isLoggedIn: false,
  displayDrawer: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.ui.get('isUserLoggedIn'),
    displayDrawer: state.ui.get('isNotificationDrawerVisible'),
  };
}

const mapDispatchToProps = (dispatch) => ({
  displayNotificationDrawer: () => dispatch(displayNotificationDrawer()),
  hideNotificationDrawer: () => dispatch(hideNotificationDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
