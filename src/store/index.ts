import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import counter, { CounterInitalState } from './modules/counter';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import user, { UserInitialState } from './modules/usert';

export interface IState {
  counter: CounterInitalState;
  user: UserInitialState;
}

const rootReducer = combineReducers({
  counter: counter,
  user: user,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
