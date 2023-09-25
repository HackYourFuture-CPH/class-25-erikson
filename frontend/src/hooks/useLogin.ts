import { auth, signInWithEmailAndPassword } from '../firebase/config';
import useErrorLoginState from '../store/errorlogin.store';

const useLogin = () => {
  const { error, setError } = useErrorLoginState();

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const verifiedUser = userCredential.user.emailVerified;

      verifiedUser ? setError(null) : setError('Please go to your e-mail and verify using the link.');
    }
    catch (err: any) {
      setError(err.message);
    }
  };

  return { login, error };
};

export default useLogin;
