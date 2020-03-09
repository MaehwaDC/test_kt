import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export default function configStore(initialState = {}) {
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk)(createStore),
  );

  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
