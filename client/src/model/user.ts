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
  id: string;
  isVerify: boolean;
  coverImageURL: string;
}

export interface IUserDataLoggedIn {
  user: IUserData;
  token: {
    access: {
      token: string;
      expire: string;
    };
  };
}

export interface IUserProfile extends Omit<IUserData, 'id'> {
  location?: string | null;
  skypeUrl?: string | null;
  about?: string | null;
  phoneNumber?: string | null;
  createdAt: Date | null;
  __v: number;
  _id: string;
}
