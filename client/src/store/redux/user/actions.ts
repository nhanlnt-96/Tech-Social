import { IUserProfile } from 'model/user';
import {
  GET_USER_PROFILE_FAILED,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
} from 'store/redux/user/actionType';

export const getUserProfileStart = (userId: string) => {
  return {
    type: GET_USER_PROFILE_START,
    payload: { userId },
  };
};

export const getUserProfileSuccess = (userProfileData: IUserProfile) => {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    payload: { userProfileData },
  };
};

export const getUserProfileFailed = (error: any) => {
  return {
    type: GET_USER_PROFILE_FAILED,
    payload: { error },
  };
};
