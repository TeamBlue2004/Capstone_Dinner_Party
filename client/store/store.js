import { createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer';

const middleware = [
  thunks,
  createLogger({
    collapsed: true,
  }),
];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
