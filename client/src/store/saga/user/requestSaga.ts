import { IUserProfile } from 'model/user';
import { call, put } from 'redux-saga/effects';
import { getUserProfileInfo } from 'services/user';
import {
  getUserProfileFailed,
  getUserProfileSuccess,
} from 'store/redux/user/actions';

export function* onGetUserProfile(action: any) {
  try {
    const response: { data: IUserProfile } = yield call(
      getUserProfileInfo,
      action.payload.userId,
    );

    yield put(getUserProfileSuccess(response.data));
  } catch (error: any) {
    const getUserProfileError = error.response.data.error;

    yield put(getUserProfileFailed(getUserProfileError));
  }
}
