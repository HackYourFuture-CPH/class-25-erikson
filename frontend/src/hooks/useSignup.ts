import { auth, createUserWithEmailAndPassword, sendEmailVerification } from '../firebase/config';
import useSignupState from '../store/signup.store';

const useSignup = () => {
  const { error, setError } = useSignupState();

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await sendEmailVerification(user);
      }
      setError(null);
    }
    catch (err: any) {
      setError(err.message);
    }
  };

  return { signup, error };
};

export default useSignup;
