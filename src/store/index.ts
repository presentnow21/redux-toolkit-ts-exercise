import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import counter, { CounterInitalState } from './modules/counter';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { all } from 'redux-saga/effects';
import { userSaga } from './saga/userSaga';
import createSagaMiddleware from 'redux-saga';
import user from './modules/user';

const sagaMiddleware = createSagaMiddleware();
export interface IState {
  counter: CounterInitalState;
}

const rootReducer = combineReducers({
  counter: counter,
  user: user,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (gDM) => gDM().concat(sagaMiddleware),
});

export function* rootSaga() {
  yield all([userSaga()]);
}

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
