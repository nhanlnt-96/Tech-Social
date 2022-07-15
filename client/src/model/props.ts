import { Dispatch, SetStateAction } from 'react';

export interface IModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export type TUploadImage = 'avatar' | 'cover';
