import { auth, signInWithEmailAndPassword } from '../firebase/config';
import useErrorState from '../store/error.store';

const useLogin = () => {
  const { error, setError } = useErrorState();

  const login = async (email: string, password: string) => {
    try {
      const userCredential =  await signInWithEmailAndPassword(auth, email, password);
      const user =userCredential.user; 
      if(user && user.emailVerified){
        setError(null);
      }
      else if ( user && !user.emailVerified){
        setError('Email is not verified . Please check your email for verification link');
      }
    }
    
    catch (err: any) {
      setError(err.message);
    }
  };

  return { login, error };
};

export default useLogin;