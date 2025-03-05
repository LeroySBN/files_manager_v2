import React from 'react';
import PropTypes from "prop-types";
import $ from 'jquery';
import {css, StyleSheet} from 'aphrodite';
import {connect} from "react-redux";

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

// Import action creators
import {
  displayNotificationDrawer,
  hideNotificationDrawer,
  login,
  logout,
  signup
} from "../actions/uiActionCreators";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginView: true  // Default to log in view
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
      this.props.logOut();
    }
  }

  // Toggle between Login and Signup views
  toggleToSignup = () => {
    this.setState({ isLoginView: false });
  }

  toggleToLogin = () => {
    this.setState({ isLoginView: true });
  }

  //
  // logIn = (email, password) =>  {
  //   this.props.logIn(email, password);
  // }
  //
  // signUp = (email, password)=> {
  //   this.props.signUp(email, password);
  // }
  //
  // logOut = ()=> {
  //   this.props.logout();
  // }

  // Notification management
  markNotificationAsRead = (id)=> {
    this.setState({
      listNotifications: this.props.listNotifications.filter(
        (notification)=> notification.id !== id
      )
    });
  };

render() {
  const {
    isLoggedIn,
    logIn,
    signUp,
    user,
    displayDrawer,
    listNotifications,
    listCourses,
    displayNotificationDrawer,
    hideNotificationDrawer
  } = this.props;

  return (
      <AppContext.Provider 
        value={{
          user,
          logOut: this.props.logOut,
        }}
      >
        <React.Fragment>
          <div className={css(styles.App)}>
            {isLoggedIn ? (
              <div className={css(styles.Dashboard)}>
                <Header />
                <Notifications
                    displayDrawer={displayDrawer}
                    listNotifications={listNotifications}
                    handleDisplayDrawer={displayNotificationDrawer}
                    handleHideDrawer={hideNotificationDrawer}
                    markNotificationAsRead={this.markNotificationAsRead}
                />
                <BodySectionWithMarginBottom title="File list">
                  <CourseList listCourses={listCourses} />
                </BodySectionWithMarginBottom>
                <Footer/>
              </div>
            ) : (
              <div className={css(styles['Access-container'])}>
                <Logo />
                {this.state.isLoginView ? (
                    <Login
                        logIn={logIn}
                        showSignup={this.toggleToSignup}
                    />
                ) : (
                    <Signup
                        signUp={signUp}
                        handleShowLogin={this.toggleToLogin}
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
  logIn: PropTypes.func.isRequired,
  signUp: PropTypes.func,
  logOut: PropTypes.func,
  user: PropTypes.object,
  displayDrawer: PropTypes.bool,
  // displayNotificationDrawer: PropTypes.func,
  listCourses: PropTypes.array,
  // hideNotificationDrawer: PropTypes.func,
  listNotifications: PropTypes.array,
};

App.defaultProps = {
  isLoggedIn: false,
  logIn: () => {},
  signUp: () => {},
  logOut: () => {},
  user: null,
  displayDrawer: false,
  listCourses: [],
  listNotifications: [],
  // displayNotificationDrawer: () => {},
  // hideNotificationDrawer: () => {},
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.ui.get('isUserLoggedIn'),
  displayDrawer: state.ui.get('isNotificationDrawerVisible'),
  user: state.ui.get('user'),
  listCourses: state.ui.get('listCourses'),
  listNotifications: state.ui.get('listNotifications'),
});

// const mapDispatchToProps = (dispatch) => ({
//   logIn: (email, password) => dispatch(login(email, password)),
//   // logIn: (email, password) => dispatch(loginRequest(email, password)),
//   signUp: (email, password) => dispatch(signup(email, password)),
//   logOut: () => dispatch(logout()),
//   displayNotificationDrawer: () => dispatch(displayNotificationDrawer()),
//   hideNotificationDrawer: () => dispatch(hideNotificationDrawer()),
// });

const mapDispatchToProps = {
  logIn: login,
  signUp: signup,
  logOut: logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
