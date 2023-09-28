import { auth, sendPasswordResetEmail } from '../firebase/config';
import useResetState from '../store/reset.store';

const useReset = () => {
  const { error, successMessage, setError, setSuccessMessage } = useResetState();

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError(null);
      setSuccessMessage('Password reset email sent. Check your inbox if you are authenticated.');
    } catch (err: any) {
      setError(err.message);
      setSuccessMessage(null);
    }
  };

  return { resetPassword, error, successMessage };
};

export default useReset;
