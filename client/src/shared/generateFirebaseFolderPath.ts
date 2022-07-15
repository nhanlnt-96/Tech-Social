import { TUploadImage } from 'model/props';

export const generateFirebaseFolderPath = (
  folderName: TUploadImage,
  userId: string,
): string => {
  return `/${userId}/${folderName}`;
};
