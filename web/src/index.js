import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App/App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Map } from 'immutable';
import uiReducer, { initialState} from './reducers/uiReducer';


// const store = createStore(uiReducer, Map(initialState));
const store = configureStore({
  reducer: uiReducer,
  preloadedState: Map(initialState),
});

// React 16
const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>, root
);
  
// React 18
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

