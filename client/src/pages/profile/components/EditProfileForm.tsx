import { ICountry, IStates } from 'model/country';
import { IUserProfile } from 'model/user';
import React, {
  FC,
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { getAllCountry } from 'services/country';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from '@mui/material';

interface IProps {
  isClearInputData: boolean;
  onCloseModalBtnClick: MouseEventHandler<HTMLButtonElement>;
}

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

export const EditProfileForm: FC<IProps> = ({
  isClearInputData,
  onCloseModalBtnClick,
}) => {
  const initialStateInput = {
    _id: '',
    countryId: '',
    stateCode: '',
    name: '',
    __v: 0,
  };

  const initialCountryInput = {
    _id: '',
    name: '',
    phoneCode: '',
    region: '',
    subregion: '',
    flag: '',
    __v: 0,
    States: [],
  };
  const [fullNameInput, setFullNameInput] = useState<string>('');
  const [aboutInput, setAboutInput] = useState<string>('');

  const [countryInput, setCountryInput] =
    useState<ICountry>(initialCountryInput);
  const [stateInput, setStateInput] = useState<IStates>(initialStateInput);
  const [country, setCountry] = useState<ICountry[]>(countryInitial);

  useLayoutEffect(() => {
    (async () => {
      const countryResponse = await getAllCountry();

      console.log(countryResponse);

      setCountry(countryResponse.data);
    })();
  }, []);

  useEffect(() => {
    setFullNameInput('');

    setCountryInput(initialCountryInput);

    setStateInput(initialStateInput);

    setAboutInput('');
  }, [isClearInputData]);

  const onSaveEditProfileBtnClick = () => {
    console.log('countryInput', countryInput);

    console.log('stateInput', stateInput);
  };

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
            setStateInput(initialStateInput);

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
      <Box component="div" sx={{ display: 'flex' }} mt={4}>
        <Button
          sx={{ color: '#0275B1', borderColor: '#0275B1', mr: 2 }}
          fullWidth
          variant="outlined"
          onClick={onCloseModalBtnClick}
        >
          Close
        </Button>
        <LoadingButton
          fullWidth
          variant="contained"
          disableElevation
          // disabled={
          //   userInput.email === '' ||
          //   userInput.password === '' ||
          //   Boolean(errorEmail) ||
          //   Boolean(errorPassword)
          // }
          // loading={isLoading}
          loadingIndicator="Signing in"
          onClick={onSaveEditProfileBtnClick}
        >
          Save
        </LoadingButton>
      </Box>
    </div>
  );
};
