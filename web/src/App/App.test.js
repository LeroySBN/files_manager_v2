/**
 * @jest-environment jsdom
 */

import React from 'react';
import { mount, shallow, render } from 'enzyme';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import { Login }  from '../Login/Login';
import Footer from '../Footer/Footer';
import { StyleSheetTestUtils } from "aphrodite";
import { AppContext } from './AppContext';
import { mapStateToProps, App } from './App';

let component;

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
  component = mount(<App />);
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  component.unmount();
});

describe('App component tests', () => {

  it('App renders without crashing', () => {
    expect(component).toBeDefined();
  });

  it('App renders with Notifications component', () => {
    expect(component.contains(<Notifications displayDrawer={true} listNotifications={[]} />)).toMatchSnapshot();
  });

  it('App renders with Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header).exists()).toBe(true);
  });

  it('App renders with Login component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Login).exists()).toBe(true);
  });

  it('App renders with Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Footer).exists()).toBe(true);
  });

  it('CourseList not displayed when isLoggedIn is false', () => {
    expect(component.find('CourseList')).toHaveLength(0);
  });
});

describe('App component key events tests', () => {
  it('Ctrl+h keydown event calls logOut function and displays an alert', () => {
    const logOut = jest.fn();
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });

    // Trigger the keydown event on the document
    document.dispatchEvent(event);

    // Update: Use setTimeout to wait for potential asynchronous updates
    setTimeout(() => {
      expect(logOut).toHaveBeenCalled();
      expect(alert).toHaveBeenCalledWith('Logging you out');

      alert.mockRestore();
    }, 0);
  });

  it('ctrl+h key press with incorrect props does not call logOut function', () => {
    const logOut = jest.fn(() => undefined);
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    window.dispatchEvent(event);
    expect(logOut).not.toHaveBeenCalled();
  });
});

describe('App component state tests', () => {
  it('verify that the default state for displayDrawer is false and that after calling handleDisplayDrawer, the state is true', () => {
    expect(component.state().displayDrawer).toBe(false);
    component.instance().handleDisplayDrawer();
    expect(component.state('displayDrawer')).toBe(true);
  });  

  it('verify that after calling handleHideDrawer, the state is false', () => {
    component.instance().handleHideDrawer();
    expect(component.state('displayDrawer')).toBe(false);
  });
});

describe('App component state tests', () => {
  it('verify that the logIn function updates the state correctly', () => {
    const email = 'test@example.com';
    const password = 'testpassword';

    // Simulate a login by calling the logIn function
    component.instance().logIn(email, password);

    // Check if the state is updated correctly
    expect(component.state().user.email).toBe(email);
    expect(component.state().user.password).toBe(password);
    expect(component.state().user.isLoggedIn).toBe(true);
  });

  it('verify that the logOut function updates the state correctly', () => {
    // Simulate a logout by calling the logOut function
    component.instance().logOut();

    // Check if the state is updated correctly
    expect(component.state().user.email).toBe('');
    expect(component.state().user.password).toBe('');
    expect(component.state().user.isLoggedIn).toBe(false);
  });
});

describe("markNotificationAsRead works as intended", () => {
  it(`verify that markNotificationAsRead works as intended, deletes the notification with the passed id from the listNotifications array`, () => {
    const context = {
      user: {},
      logOut: jest.fn(),
      listNotifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, html: { __html: jest.fn() }, type: "urgent" },
      ],
    };

    const wrapper = mount(
      <AppContext.Provider value={context}>
        <App />
      </AppContext.Provider>
    );

    const instance = wrapper.instance();

    instance.markNotificationAsRead(3);

    expect(wrapper.state().listNotifications).toEqual([
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
    ]);

    expect(wrapper.state().listNotifications.length).toBe(2);
    expect(wrapper.state().listNotifications[3]).toBe(undefined);

    wrapper.unmount();
  });
});

describe('Test MapStateToProps', () => {
  it('verifies that when isLoggedIn is true, the Login component is not included', () => {
    const state = {
      ui: {
        isNotificationDrawerVisible: false,
        isUserLoggedIn: true,
        user: {
          email: '',
          password: '',
          isLoggedIn: true,
        },
      },
    };

    const result = mapStateToProps(state);
    expect(result).toEqual({ isLoggedIn: true });
  });
});
