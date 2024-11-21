import React from 'react';
import  { shallow } from 'enzyme';
import { Login } from './Login';
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});


describe('Login component testing', () => {
  it('Login renders without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Login renders with two input tags', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('input')).toHaveLength(3);
  });

  it('Login renders with two label tags', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('label')).toHaveLength(2);
  });
});

describe("test for submit input on form", () => {
  it('should have the submit button disabled by default', () => {
    const component = shallow(<Login />);
    const submitButton = component.find('input[type="submit"]');
    expect(submitButton.props().disabled).toBe(true);
  });

  it('should enable the submit button after changing the values of email and password inputs', () => {
    const component = shallow(<Login />);
    
    component.find('#email').simulate('change', { target: { value: 'test@example.com' } });
    component.find('#password').simulate('change', { target: { value: '!password123' } });
    
    const submitButton = component.find('input[type="submit"]');
    expect(submitButton.props().disabled).toBe(true);
  });
});
