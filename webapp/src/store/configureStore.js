import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';

const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['@@redux/INIT'],
            ignoredActionPaths: ['payload.toJS', 'payload.merge', 'payload.set'],
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
