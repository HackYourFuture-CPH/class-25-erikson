import { auth, fetchSignInMethodsForEmail, sendPasswordResetEmail } from '../firebase/config';
import useResetState from '../store/reset.store';

const useReset = () => {
  const { error, successMessage, setError, setSuccessMessage } = useResetState();

  const resetPassword = async (email: string) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length === 0) {
        setError('User with this email does not exist.');
        setSuccessMessage(null);
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setError(null);
      setSuccessMessage('Password reset email sent. Check your inbox.');
    }
    catch (err: any) {
      setError(err.message);
      setSuccessMessage(null);
    }
};

  return { resetPassword, error, successMessage };
};

export default useReset;
