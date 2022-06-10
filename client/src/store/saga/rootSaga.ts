import { fork } from 'redux-saga/effects';
import {
  onLoginSagaHandler,
  onLogoutSagaHandle,
} from 'store/saga/auth/handlerSaga';

function* rootSaga() {
  yield fork(onLoginSagaHandler);

  yield fork(onLogoutSagaHandle);
}

export default rootSaga;
