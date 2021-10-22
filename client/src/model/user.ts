export interface IRegisterUser {
  email: string;
  fullName: string;
  password: string;
}

export interface IRegisterGoogleUser {
  email: string;
  displayName: string;
  photoURL: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserData {
  avatarImageURL: string;
  email: string;
  fullName: string;
  iat: number;
  id: string;
  isVerify: boolean;
}
