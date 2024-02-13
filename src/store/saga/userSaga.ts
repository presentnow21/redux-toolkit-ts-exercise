import { call, put, takeLatest } from 'redux-saga/effects';
import { FullUser, userActions } from '../modules/user';

const getUser = (id: number) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

export function* getUserSaga(action: { payload: number }) {
  const userId = action.payload;
  try {
    const res: Response = yield call(getUser, userId);
    const data: FullUser = yield res.json();
    yield put(userActions.successLogin(data));
  } catch (err) {
    yield put(userActions.failLogin());
  }
}

export function* userSaga() {
  const { tryLogiin } = userActions;
  yield takeLatest(tryLogiin, getUserSaga);
}
