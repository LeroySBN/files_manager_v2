import React, { useEffect } from 'react';

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
