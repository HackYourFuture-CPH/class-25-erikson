import { auth, sendPasswordResetEmail } from '../firebase/config';
import useNotificationStore from '../store/notification.store';
import useResetState from '../store/reset.store';

const useReset = () => {
  const { error, successMessage, setError, setSuccessMessage } = useResetState();
  const { setNotification } = useNotificationStore();

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError(null);
      setSuccessMessage('Password reset email sent. Check your inbox if you are authenticated.');
      setNotification({
        message: 'Password reset email sent. Check your inbox if you are authenticated.',
        severity: 'success',
      });
    } catch (err: any) {
      setError(err.message);
      setSuccessMessage(null);
      setNotification({ message: err.message, severity: 'error' });
    }
  };

  return { resetPassword, error, successMessage };
};

export default useReset;
