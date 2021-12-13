import React, { FC, useLayoutEffect, useState } from 'react';
import { Autocomplete, Box, FormControl, TextField } from '@mui/material';
import { IUserProfile } from 'model/user';
import { getAllCountry } from 'services/country';
import { ICountry, IStates } from 'model/country';

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
  const [countryInput, setCountryInput] = useState<ICountry>();
  const [stateInput, setStateInput] = useState<IStates>();
  const [aboutInput, setAboutInput] = useState<string>('');
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
          getOptionLabel={(option) => option.name}
          options={country}
          value={countryInput}
          onChange={(event: any, value: any) => {
            setStateInput([]);
            setCountryInput(value);
          }}
          renderOption={(props, option) => {
            return (
              <Box
                component="li"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
              >
                {option.name} {option.flag}
              </Box>
            );
          }}
          renderInput={(params) => {
            return (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                className="input-without-label"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  'aria-label': 'Without label',
                  autoComplete: 'new-password',
                }}
              />
            );
          }}
        />
      </FormControl>
      <FormControl fullWidth>
        <p>Locations in this Country/Region</p>
        <Autocomplete
          freeSolo
          disableClearable
          getOptionLabel={(option) => option.name}
          options={countryInput?.States || []}
          value={stateInput}
          onChange={(event: any, value: any) => setStateInput(value)}
          renderOption={(props, option) => {
            return (
              <Box
                component="li"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
              >
                {option.name}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              className="input-without-label"
              InputProps={{
                ...params.InputProps,
                type: 'search',
                'aria-label': 'Without label',
                autoComplete: 'new-password',
              }}
            />
          )}
        />
      </FormControl>
    </div>
  );
};
