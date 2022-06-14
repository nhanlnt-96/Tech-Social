import { ICountry, IStates } from 'model/country';
import { initialStateInput } from 'pages/profile/components/EditProfileForm';
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';

import {
  Autocomplete,
  Box,
  CircularProgress,
  FormControl,
  TextField,
} from '@mui/material';

interface IProps {
  countryInput: ICountry;
  setCountryInput: Dispatch<SetStateAction<ICountry>>;
  setStateInput: Dispatch<SetStateAction<IStates>>;
  stateInput: IStates;
  locationData: string;
  country: ICountry[];
  isLoadingCountry: boolean;
  isOpenCountrySelect: boolean;
  setIsOpenCountrySelect: Dispatch<SetStateAction<boolean>>;
}

export const EditLocationForm: FC<IProps> = ({
  countryInput,
  setCountryInput,
  setStateInput,
  stateInput,
  locationData,
  country,
  isLoadingCountry,
  setIsOpenCountrySelect,
  isOpenCountrySelect,
}) => {
  useEffect(() => {
    if (locationData) {
      const locationDataArr = locationData.split(', ');

      const countryValue = country.filter(
        (value) => value.name === locationDataArr[1],
      )[0];

      setCountryInput(countryValue);

      setStateInput(
        countryValue?.States.filter(
          (value) => value.name === locationDataArr[0],
        )[0],
      );
    }
  }, [country, locationData]);

  return (
    <>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <p>Country/Region</p>
        <Autocomplete
          disabled={Boolean(locationData && isLoadingCountry)}
          loading={isLoadingCountry}
          open={isOpenCountrySelect}
          onOpen={() => setIsOpenCountrySelect(true)}
          onClose={() => setIsOpenCountrySelect(false)}
          freeSolo
          disableClearable
          getOptionLabel={(option: any) => option.name}
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
                  endAdornment: (
                    <>
                      {(isOpenCountrySelect && isLoadingCountry) ||
                      (locationData && isLoadingCountry) ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            );
          }}
        />
      </FormControl>
      <FormControl fullWidth>
        <p>Locations in this Country/Region</p>
        <Autocomplete
          disabled={Boolean(locationData && isLoadingCountry)}
          freeSolo
          disableClearable
          getOptionLabel={(option: any) => option.name}
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
                endAdornment: (
                  <>
                    {locationData && isLoadingCountry ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </FormControl>
    </>
  );
};
