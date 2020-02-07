import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const immutableMiddleware = reduxImmutableStateInvariant();
const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  applyMiddleware(immutableMiddleware, thunkMiddleware, loggerMiddleware)
);
