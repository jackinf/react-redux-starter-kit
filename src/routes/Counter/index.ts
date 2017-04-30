import { injectReducer } from '../../store/reducers'

declare let require;
declare let System: any;
export default (store) => {
  return System.import("counter").then(module => {
    /*  Webpack - use require callback to define
     dependencies for bundling   */
    const Counter = require('./containers/CounterContainer').default;
    const reducer = require('./modules/counter').default;

    /*  Add the reducer to the store on key 'counter'  */
    injectReducer(store, { key: 'counter', reducer });
  });
}
