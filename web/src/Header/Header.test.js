import React from 'react';
import { shallow, mount } from 'enzyme';
import { StyleSheetTestUtils } from "aphrodite";
import Header from './Header';
import { AppContext } from '../App/AppContext';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});


describe('Header component testing', () => {
  it('Header renders without crashing', () => {
    const component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });

  it('Header renders a div with the class App-header', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('#App-header')).toHaveLength(1);
  });

  it('Header renders a div with h1 tag', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('renders logoutSection with user defined context', () => {
    const user = { isLoggedIn: true, email: 'test@example.com' };
    const wrapper = mount(
      <AppContext.Provider value={{ user }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').exists()).toBe(true);
    wrapper.unmount();
  });

  it('calls logOut spy when logout link is clicked', () => {
    const user = { isLoggedIn: true, email: 'test@example.com' };
    const logOutSpy = jest.fn();
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut: logOutSpy }}>
        <Header />
      </AppContext.Provider>
    );
    wrapper.find('a').simulate('click');
    expect(logOutSpy).toHaveBeenCalled();
    wrapper.unmount();
  });
});
