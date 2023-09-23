import { auth, signInWithEmailAndPassword } from '../firebase/config';
import useLoginState from '../store/login.store';

const useLogin = () => {
  const { error, setError } = useLoginState();

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    }
    catch (err: any) {
      setError(err.message);
    }
  };

  return { login, error };
};

export default useLogin;