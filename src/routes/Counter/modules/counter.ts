///<reference path="../../../../node_modules/redux-typescript-actions/lib/index.d.ts"/>
import actionCreatorFactory, {
  isType,
  ActionCreator,
  EmptyActionCreator,
  AsyncActionCreators,
  Failure
} from "redux-typescript-actions";
const actionCreator = actionCreatorFactory();

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT: string = 'COUNTER_INCREMENT';
export const COUNTER_DOUBLE_ASYNC: string = 'COUNTER_DOUBLE_ASYNC';
export const RESET_COUNTER: string = 'RESET_COUNTER';

// ------------------------------------
// Actions
// ------------------------------------

export const increment: ActionCreator<number> = actionCreator<number>(COUNTER_INCREMENT);
export const resetCounter: EmptyActionCreator = actionCreator(RESET_COUNTER);
const doubleAsync: AsyncActionCreators<number, number, number> = actionCreator.async<number, number, number>(COUNTER_DOUBLE_ASYNC);

export const counterDouble = () => {
  return (dispatch, getState) => {
    dispatch(doubleAsync.started(1));
    setTimeout(() => {
      try {
        // fetch.get ...
        const resp = getState().counter;
        dispatch(doubleAsync.done(resp));
      } catch (e) {
        const resp: Failure<number, number> = {params: 1, error: 1};
        dispatch(doubleAsync.failed(resp)); // failed to fetch.get
      }
    }, 500);
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = 0;
export default function counterReducer(state: number = initialState, action) {
  if (isType(action, increment)) { // same as action.type === increment.type
    return state + action.payload;
  }
  else if (isType(action, resetCounter)) {
    return 0;
  }
  else if (isType(action, doubleAsync.done)) {
    return state * 2;
  }
  else {
    return state;
  }
}
