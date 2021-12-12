interface IStates {
  _id: string;
  countryId: string;
  stateCode: string;
  name: string;
  __v: number;
}

export interface ICountry {
  _id: string;
  name: string;
  phoneCode: string;
  region: string;
  subregion: string;
  flag: string;
  __v: number;
  States: IStates[] | [];
}
