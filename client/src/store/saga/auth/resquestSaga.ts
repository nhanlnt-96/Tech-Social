import { call, put } from 'redux-saga/effects';
import { getAuthUser } from 'services/auth';
import { getAuthFail, getAuthSuccess } from 'store/redux/auth/actions';
import { IUserData } from 'model/user';

export function* onGetAuthSagaRequest() {
  try {
    const response: { data: IUserData } = yield call(getAuthUser);
    console.log(response.data);
    yield put(getAuthSuccess(response.data));
  } catch (error) {
    yield put(getAuthFail(error));
  }
}
