import {
  Action,
  AnyAction,
  Reducer,
  Store,
  UnknownAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import counter, { CounterInitalState } from './modules/counter';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

export interface IState {
  counter: CounterInitalState;
}

// const rootReducer = combineReducers({
//   counter: counter,
// });

const rootReducer = (state: IState, action: UnknownAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        counter: counter,
      });
      return combinedReducer(state, action);
    }
  }
};

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer as Reducer<IState, UnknownAction>,
    devTools: true,
  });
  return store;
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const wrapper = createWrapper<Store<IState>>(createStore);
export default wrapper;
