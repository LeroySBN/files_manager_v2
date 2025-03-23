import { configureStore } from '@reduxjs/toolkit';
import { Map } from 'immutable';
import rootReducer from '../reducers/rootReducer';

const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: Map(), // Initial state is an Immutable Map
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore Immutable.js methods in actions
            ignoredActions: ['@@redux/INIT'],
            ignoredActionPaths: ['payload.toJS', 'payload.merge', 'payload.set'],
            // Ignore Immutable.js objects in state
            ignoredPaths: ['auth.user'],
          },
          immutableCheck: false,
        }),
  });

  // Enable hot reloading in development
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureAppStore;
