import { auth, signInWithEmailAndPassword } from '../firebase/config';
import useErrorState from '../store/error.store';

const useLogin = () => {
  const { error, setError } = useErrorState();

  const login = async (email: string, password: string) => {
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