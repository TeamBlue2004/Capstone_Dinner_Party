import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers/index';

const middleware = [
  ReduxThunk,
  createLogger({
    collapsed: true,
  }),
];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
