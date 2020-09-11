import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import App from './app';

const app = document.querySelector('#app');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  app,
  () => console.log('App rendered!')
);
