import { fork } from 'redux-saga/effects';
import AuthSaga from 'store/redux/auth/sagas';
import {
  onLoginSagaHandler,
  onLogoutSagaHandler,
} from 'store/saga/auth/handlerSaga';
import { onGetUserProfileHandler } from 'store/saga/user/handlerSaga';

function* rootSaga() {
  yield fork(AuthSaga);

  yield fork(UserSaga);

  yield fork(onGetUserProfileHandler);
}

export default rootSaga;
