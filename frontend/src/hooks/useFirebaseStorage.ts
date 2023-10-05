import { useState } from 'react';
import { storage, ref, uploadString, getDownloadURL } from '../firebase/config';

const useFirebaseStorage = () => {
  const [isUploading, setIsUploading] = useState(false);

  const generateUniqueFileName = (fileName: string) => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const timestamp = new Date().getTime();
    const fileExtension = fileName.split('.').pop();
    return `${timestamp}_${randomString}.${fileExtension}`;
  };

  const uploadImageToFirebaseStorage = async (file: File, path: string) => {
    setIsUploading(true);
    const storageRef = ref(storage, path);
    try {
      const fileReader = new FileReader();
      fileReader.onloadend = async (event) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          const base64String = event.target.result.split(',')[1];
          await uploadString(storageRef, base64String, 'data_url');
          const downloadURL = await getDownloadURL(storageRef);
          setIsUploading(false);
          return downloadURL;
        } else {
          setIsUploading(false);
          throw new Error('Error reading file or converting to base64.');
        }
      };
      fileReader.readAsDataURL(file);
    } catch (error) {
      setIsUploading(false);
      console.error(error);
    }
  };

  return {
    generateUniqueFileName,
    uploadImageToFirebaseStorage,
    isUploading,
  };
};

export default useFirebaseStorage;
