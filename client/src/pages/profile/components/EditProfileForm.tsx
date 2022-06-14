import LoadingMask from 'components/loadingMask/LoadingMask';
import { ICountry, IStates } from 'model/country';
import { EditLocationForm } from 'pages/profile/components/EditLocationForm';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllCountry } from 'services/country';
import { updateUserProfileInfo } from 'services/user';
import { fullNameRegex } from 'shared/regex';
import { getUserProfileStart } from 'store/redux/user/actions';
import { IRootState } from 'store/rootReducer';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';

interface IProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
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

export const initialStateInput = {
  _id: '',
  countryId: '',
  stateCode: '',
  name: '',
  __v: 0,
};

export const initialCountryInput = {
  _id: '',
  name: '',
  phoneCode: '',
  region: '',
  subregion: '',
  flag: '',
  __v: 0,
  States: [],
};

export const EditProfileForm: FC<IProps> = ({ setVisible }) => {
  const dispatch = useDispatch();
  const { id } = useParams<any>();

  const userProfileData = useSelector(
    (state: IRootState) => state.getUserProfile,
  );
  const [fullNameInput, setFullNameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [aboutInput, setAboutInput] = useState<string>('');

  const [countryInput, setCountryInput] =
    useState<ICountry>(initialCountryInput);
  const [stateInput, setStateInput] = useState<IStates>(initialStateInput);
  const [locationData, setLocationData] = useState<string>('');
  const [country, setCountry] = useState<ICountry[]>(countryInitial);

  const [isOpenCountrySelect, setIsOpenCountrySelect] =
    useState<boolean>(false);
  const [isLoadingCountry, setIsLoadingCountry] = useState<boolean>(false);
  const [isSaveEditProfile, setIsSaveEditProfile] = useState<boolean>(false);

  useEffect(() => {
    if (userProfileData.userProfileData.user) {
      setFullNameInput(userProfileData.userProfileData.user.fullName || '');

      setEmailInput(userProfileData.userProfileData.user.email || '');

      setAboutInput(userProfileData.userProfileData.user.about || '');

      setLocationData(userProfileData.userProfileData.user.location || '');
    }
  }, [userProfileData.userProfileData.user]);

  useEffect(() => {
    const getCountryData = async () => {
      setIsLoadingCountry(true);

      const countryResponse = await getAllCountry();

      if (countryResponse.status) {
        setCountry(countryResponse.data);

        setIsLoadingCountry(false);
      }
    };
    if (isOpenCountrySelect && country === countryInitial) {
      getCountryData();
    }
    if (locationData && country === countryInitial) {
      getCountryData();
    }
  }, [isOpenCountrySelect, locationData]);

  const closeEditModal = () => {
    setVisible(false);
  };

  const onSaveEditProfileBtnClick = async () => {
    setIsSaveEditProfile(true);

    const response = await updateUserProfileInfo(
      fullNameInput,
      `${stateInput.name}, ${countryInput.name}`,
      aboutInput,
    );

    if (response.status === 200) {
      dispatch(getUserProfileStart(id));

      closeEditModal();

      setIsSaveEditProfile(false);
    }
  };

  return (
    <>
      <div className="edit-profile-form">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <p>Full name *</p>
          <TextField
            required
            fullWidth
            name="fullName"
            autoComplete="off"
            className="input-without-label input-padding"
            value={fullNameInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFullNameInput(e.target.value)
            }
            error={!fullNameInput}
            helperText={
              !fullNameRegex.test(fullNameInput) &&
              'Full name can not contains number or special character.'
            }
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
            value={emailInput}
          />
        </FormControl>
        <div className="about-textarea">
          <p>About</p>
          <textarea
            rows={5}
            value={aboutInput}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setAboutInput(e.target.value)
            }
          />
        </div>
        <EditLocationForm
          countryInput={countryInput}
          setCountryInput={setCountryInput}
          setStateInput={setStateInput}
          stateInput={stateInput}
          locationData={locationData}
          country={country}
          isLoadingCountry={isLoadingCountry}
          isOpenCountrySelect={isOpenCountrySelect}
          setIsOpenCountrySelect={setIsOpenCountrySelect}
        />
        <Box component="div" sx={{ display: 'flex' }} mt={4}>
          <Button
            sx={{ color: '#0275B1', borderColor: '#0275B1', mr: 2 }}
            fullWidth
            variant="outlined"
            onClick={closeEditModal}
          >
            Close
          </Button>
          <LoadingButton
            fullWidth
            variant="contained"
            disableElevation
            loading={isSaveEditProfile}
            disabled={
              isSaveEditProfile ||
              Boolean(isLoadingCountry && locationData) ||
              (fullNameInput.trim() ===
                userProfileData.userProfileData.user.fullName &&
                aboutInput.trim() ===
                  userProfileData.userProfileData.user.about &&
                `${stateInput.name}, ${countryInput.name}` === locationData) ||
              !fullNameInput
            }
            loadingIndicator="Saving"
            onClick={onSaveEditProfileBtnClick}
          >
            Save
          </LoadingButton>
        </Box>
      </div>
      {userProfileData.isLoading && <LoadingMask />}
    </>
  );
};
