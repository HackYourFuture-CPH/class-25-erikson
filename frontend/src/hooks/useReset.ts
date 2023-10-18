import { useState } from 'react';
import { auth, sendPasswordResetEmail } from '../firebase/config';
import useNotificationStore from '../store/notification.store';
import useResetState from '../store/reset.store';

const useReset = () => {
  const { error, successMessage, setError, setSuccessMessage } = useResetState();
  const { setNotification } = useNotificationStore();
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      setError(null);
      setSuccessMessage('Password reset email sent. Check your inbox if you are authenticated.');
      setNotification({
        message: 'Password reset email sent. Check your inbox if you are authenticated.',
        severity: 'success',
      });
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
      setSuccessMessage(null);
      setNotification({ message: err.message, severity: 'error' });
      setIsLoading(false);
    }
  };

  return { resetPassword, error, successMessage, isLoading };
};

export default useReset;
