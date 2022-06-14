import { takeEvery } from 'redux-saga/effects';
import { GET_USER_PROFILE_START } from 'store/redux/user/actionType';
import { onGetUserProfile } from 'store/saga/user/requestSaga';

export function* onGetUserProfileHandler() {
  yield takeEvery(GET_USER_PROFILE_START, onGetUserProfile);
}
