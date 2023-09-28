import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from '../firebase/config';
import useErrorSignupState from '../store/errorsignup.store';

const useSignup = () => {
  const { error, setError } = useErrorSignupState();

  const signup = async (email: string, password: string, firstName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const capitalizedFirstWords = firstName
        .trim()
        .split(' ')
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
      const displayName = capitalizedFirstWords.join(' ');

      if (user) {
        await sendEmailVerification(user);
        await updateProfile(user, {
          displayName,
        });
        setError('A verification link has been sent to your e-mail.');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { signup, error };
};

export default useSignup;
