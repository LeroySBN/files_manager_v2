import React from 'react';

const WithLogging = (WrappedComponent) => {
  class WithLogging extends React.Component {
    componentDidMount() {
      console.log(`Component ${this.displayName || WrappedComponent.name || 'Component'} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${this.displayName || WrappedComponent.name || 'Component'} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLogging.displayName = `WithLogging(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithLogging;
};

export default WithLogging;
