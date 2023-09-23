import { auth, createUserWithEmailAndPassword, sendEmailVerification } from '../firebase/config';
import useErrorState from '../store/error.store';

const useSignup = () => {
  const { error, setError } = useErrorState();

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
