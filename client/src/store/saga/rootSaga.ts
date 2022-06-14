import { fork } from 'redux-saga/effects';
import {
  onLoginSagaHandler,
  onLogoutSagaHandler,
} from 'store/saga/auth/handlerSaga';
import { onGetUserProfileHandler } from 'store/saga/user/handlerSaga';

function* rootSaga() {
  yield fork(onLoginSagaHandler);

  yield fork(onLogoutSagaHandler);

  yield fork(onGetUserProfileHandler);
}

export default rootSaga;
