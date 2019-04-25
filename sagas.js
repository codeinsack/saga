import {
  put, takeEvery, all, call, select, takeLatest, take, throttle,
} from 'redux-saga/effects';

export const delay = ms => new Promise(res => setTimeout(res, ms));

// function* helloSaga() {
//   console.log('Hello Sagas!');
// }

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  // yield call(delay, 1000);
  console.log('hello!');
  yield put({ type: 'INCREMENT' });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  // yield takeLatest('INCREMENT_ASYNC', incrementAsync);
  yield throttle(2000, 'INCREMENT_ASYNC', incrementAsync);
}

function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select();

    console.log('action', action);
    console.log('state after', state);
  });
}

function* watchFirstThreeIncrements() {
  for (let i = 0; i < 3; i++) {
    yield take('INCREMENT');
  }
  yield put({ type: 'SHOW_CONGRATULATION' });
}

// Single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    // helloSaga(),
    watchIncrementAsync(),
    // watchAndLog(),
    // watchFirstThreeIncrements(),
  ]);
}
