import { useState } from 'react';
import { storage, ref, getDownloadURL, uploadBytes } from '../firebase/config';

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
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setIsUploading(false);
      return downloadURL;
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
