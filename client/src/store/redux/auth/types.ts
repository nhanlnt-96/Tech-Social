export type ActionLoginUser = {
  type: string;
  payload: {
    isLoading: boolean;
    isLogged: boolean;
  };
};
