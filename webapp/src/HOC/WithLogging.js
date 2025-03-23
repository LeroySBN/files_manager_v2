import React, { useEffect } from 'react';

// const WithLogging = (WrappedComponent) => {
//   class WithLogging extends React.Component {
//     componentDidMount() {
//       console.log(`Component ${this.displayName || WrappedComponent.name || 'Component'} is mounted`);
//     }
//
//     componentWillUnmount() {
//       console.log(`Component ${this.displayName || WrappedComponent.name || 'Component'} is going to unmount`);
//     }
//
//     render() {
//       return <WrappedComponent {...this.props} />;
//     }
//   }
//
//   WithLogging.displayName = `WithLogging(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
//
//   return WithLogging;
// };
//
// export default WithLogging;

const WithLogging = (WrappedComponent) => {
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const WithLoggingComponent = (props) => {
    useEffect(() => {
      console.log(`Component ${componentName} is mounted`);
      return () => {
        console.log(`Component ${componentName} is going to unmount`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  WithLoggingComponent.displayName = `WithLogging(${componentName})`;
  return WithLoggingComponent;
};

export default WithLogging;
