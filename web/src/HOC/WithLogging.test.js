import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';

describe('WithLogging HOC', () => {
  it('should log mount and unmount for pure HTML component', () => {
    const WrappedComponent = () => <div>Some HTML content</div>;
    const HOC = WithLogging(WrappedComponent);

    const spyConsoleLog = jest.spyOn(console, 'log');
    const wrapper = mount(<HOC />);

    expect(spyConsoleLog).toHaveBeenCalledWith('Component WrappedComponent is mounted');

    wrapper.unmount();
    expect(spyConsoleLog).toHaveBeenCalledWith('Component WrappedComponent is going to unmount');

    spyConsoleLog.mockRestore();
  });

  it('should log mount and unmount with the name of the component for the Login component', () => {
    const Login = () => <div>Login component</div>;
    const HOC = WithLogging(Login);

    const spyConsoleLog = jest.spyOn(console, 'log');
    const wrapper = mount(<HOC />);

    expect(spyConsoleLog).toHaveBeenCalledWith('Component Login is mounted');

    wrapper.unmount();
    expect(spyConsoleLog).toHaveBeenCalledWith('Component Login is going to unmount');

    spyConsoleLog.mockRestore();
  });
});
