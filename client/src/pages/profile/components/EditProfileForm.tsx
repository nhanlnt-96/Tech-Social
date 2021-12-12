import React, { FC, useLayoutEffect, useState } from 'react';
import { Autocomplete, FormControl, TextField } from '@mui/material';
import { IUserProfile } from 'model/user';
import { getAllCountry } from 'services/country';
import { ICountry } from 'model/country';

const countryInitial: ICountry[] = [
  {
    _id: '',
    name: '',
    phoneCode: '',
    region: '',
    subregion: '',
    flag: '',
    __v: 0,
    States: [
      {
        _id: '',
        countryId: '',
        stateCode: '',
        name: '',
        __v: 0,
      },
    ],
  },
];

export const EditProfileForm: FC = () => {
  const [fullNameInput, setFullNameInput] = useState<string>('');
  const [countryInput, setCountryInput] = useState<string>('');
  const [stateInput, setStateInput] = useState<string>('');
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>('');
  const [country, setCountry] = useState<ICountry[]>(countryInitial);
  useLayoutEffect(() => {
    (async () => {
      const countryResponse = await getAllCountry();
      setCountry(countryResponse.data);
    })();
  }, []);
  return (
    <div className="edit-profile-form">
      <FormControl fullWidth sx={{ mb: 2 }}>
        <p>Full name *</p>
        <TextField
          required
          fullWidth
          name="fullName"
          autoComplete="off"
          className="input-without-label input-padding"
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <p>Email *</p>
        <TextField
          required
          disabled
          fullWidth
          name="email"
          autoComplete="off"
          className="input-without-label input-padding"
        />
      </FormControl>
      <div className="about-textarea">
        <p>About</p>
        <textarea rows={5} />
      </div>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <p>Country/Region</p>
        <Autocomplete
          freeSolo
          disableClearable
          options={country.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              className="input-without-label"
              InputProps={{
                ...params.InputProps,
                type: 'search',
                'aria-label': 'Without label',
              }}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth>
        <p>Locations in this Country/Region</p>
        <Autocomplete
          freeSolo
          disableClearable
          options={country.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              className="input-without-label"
              InputProps={{
                ...params.InputProps,
                type: 'search',
                'aria-label': 'Without label',
              }}
            />
          )}
        />
      </FormControl>
    </div>
  );
};
