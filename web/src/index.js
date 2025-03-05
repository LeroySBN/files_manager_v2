import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './index.css';

import { App } from './App/App';
import uiReducer, { initialState } from './reducers/uiReducer';

const store = configureStore({
    reducer: { ui: uiReducer },
    preloadedState: { ui: initialState },
});

console.log('Initial Redux Store State:', store.getState().ui);

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
