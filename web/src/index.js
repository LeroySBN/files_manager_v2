import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App/App';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import uiReducer, {initialState} from './reducers/uiReducer';

const store = configureStore({
    reducer: { ui: uiReducer },
    preloadedState: { ui: initialState },
});

console.log('Redux Store', store);

// React 16
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
  
// React 18
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

