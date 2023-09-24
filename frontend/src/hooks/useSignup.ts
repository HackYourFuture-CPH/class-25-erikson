import { auth, createUserWithEmailAndPassword, sendEmailVerification } from '../firebase/config';
import useErrorSignupState from '../store/errorsignup.store';

const useSignup = () => {
  const { error, setError } = useErrorSignupState();

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await sendEmailVerification(user);
        setError('A verification link has been sent to your e-mail.');
      }
    }
    catch (err: any) {
      setError(err.message);
    }
  };

  return { signup, error };
};

export default useSignup;
