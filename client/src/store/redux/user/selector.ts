import { IRootState } from 'store/rootReducer';

export const getUsers = (reducerState: IRootState) =>
  reducerState.user.userProfileData;
