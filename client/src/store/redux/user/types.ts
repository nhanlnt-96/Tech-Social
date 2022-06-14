import { IUserProfile } from 'model/user';

export type ActionGetUserProfile = {
  type: string;
  payload: {
    userId: string;
    userProfileData: {
      user: IUserProfile;
      post: any;
    };
    error: any;
  };
};
