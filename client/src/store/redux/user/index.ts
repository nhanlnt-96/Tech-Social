import { IUserProfile } from 'model/user';
import {
  GET_USER_PROFILE_FAILED,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
} from 'store/redux/user/actionType';
import { ActionGetUserProfile } from 'store/redux/user/types';

export interface IUserState {
  isLoading: boolean;
  userProfileData: {
    user: IUserProfile;
    post: any;
  };
  getUserProfileError: any;
  user?: IUserProfile;
}

const getUserProfileState: IUserState = {
  isLoading: false,
  userProfileData: {
    user: {
      about: null,
      avatarImageURL: '',
      createdAt: null,
      email: '',
      fullName: '',
      isVerify: false,
      location: null,
      phoneNumber: null,
      skypeUrl: null,
      __v: 0,
      _id: '',
    },
    post: [],
  },
  getUserProfileError: null,
};

const getUserProfileReducer = (
  state = getUserProfileState,
  actions: ActionGetUserProfile,
) => {
  switch (actions.type) {
    case GET_USER_PROFILE_START:
      return {
        ...state,
        isLoading: true,
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userProfileData: {
          user: actions.payload.userProfileData.user,
          post: actions.payload.userProfileData.post,
        },
      };

    case GET_USER_PROFILE_FAILED:
      return {
        ...state,
        isLoading: false,
        getUserProfileError: actions.payload.error,
      };
    default:
      return state;
  }
};

export default getUserProfileReducer;
