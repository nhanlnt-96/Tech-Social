import { fork } from 'redux-saga/effects';
import { onLoginSagaHandler } from 'store/saga/auth/handlerSaga';

function* rootSaga() {
  yield fork(onLoginSagaHandler);
}

export default rootSaga;
