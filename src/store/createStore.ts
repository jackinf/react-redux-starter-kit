import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from './location'

declare let module: { hot: any };
export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  let composeEnhancers = compose;

  if (true /*__DEV__*/) { // TODO: check for Dev mode
    const composeWithDevToolsExtension = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"];
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store: any = createStore(
    makeRootReducer(null),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  // const store = createStore(
  //   makeRootReducer(),
  //   initialState,
  //   composeEnhancers(
  //     applyMiddleware(...middleware),
  //     ...enhancers
  //   )
  // );
  store.asyncReducers = {};

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
