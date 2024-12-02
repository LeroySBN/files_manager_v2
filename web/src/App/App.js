import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { StyleSheet, css } from 'aphrodite';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { user, AppContext } from './AppContext';
import Logo from "../Logo/Logo";
import { Login } from "../Login/Login";
import { Signup } from "../Signup/Signup";
import Header from "../Header/Header";

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
      displayDrawer: false,
      user: user,
      logOut: this.logOut,
      listNotifications: listNotifications,
      hasJoined: true,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
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
  
  handleKeyPress = (event)=> {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.state.logOut();
    }
  }

  handleDisplayDrawer = ()=> {
    // console.log('handleDisplayDrawer called');
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer = ()=> {
    this.setState({ displayDrawer: false });
  }

  handleShowSignup = () => {
    console.log('handleShowSignup called');
    this.setState({ hasJoined: false });
  }

  handleShowLogin = () => {
    console.log('handleShowLogin called');
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
      listNotifications: this.state.listNotifications.filter((notification)=> notification.id !== id)
    });
  };

  render() {
    return (
      <AppContext.Provider value={{
        user: this.state.user,
        logOut: this.state.logOut,
      }}>
        <React.Fragment>
          <div className={css(styles.App)}>
            {this.state.user.isLoggedIn ? (
                <div className={css(styles.pageContainer)}>
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
  pageContainer: {
    minHeight: '100vh',
    position: 'relative',
    background: '#ffffff',
  },
  ['Access-container']: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '50px',
    marginTop: '50px',
  },
})

export function mapStateToProps (state) {
  return {
    isLoggedIn: state.ui.isUserLoggedIn,
  };
}

export default connect(mapStateToProps, null)(App);
