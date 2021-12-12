import api from 'configs/axios';

export const getAllCountry = () => {
  return api.get('/country');
};
