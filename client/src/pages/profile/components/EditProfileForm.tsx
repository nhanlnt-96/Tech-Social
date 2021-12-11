import React, { FC, useState } from 'react';
import {
  Autocomplete,
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Country from 'shared/countries.json';
import { IUserProfile } from 'model/user';

export const EditProfileForm: FC = () => {
  const [editProfile, setEditProfile] = useState<IUserProfile>({
    fullName: '',
    country: '',
    location: '',
    about: '',
    phoneNumber: '',
    skype: '',
    facebook: '',
  });
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
          fullWidth
          options={Country}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Box component="li" {...props}>
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              className="input-without-label input-padding"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth>
        <p>Locations in this Country/Region</p>
        <Select className="input-without-label">
          {Country.map((val) => (
            <MenuItem value={val.name}>{val.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
