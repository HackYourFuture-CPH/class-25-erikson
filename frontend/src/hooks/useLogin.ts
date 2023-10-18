import { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase/config';
import useErrorLoginState from '../store/errorlogin.store';
import useNotificationStore from '../store/notification.store';

const useLogin = () => {
  const { error, setError } = useErrorLoginState();
  const { setNotification } = useNotificationStore();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const verifiedUser = userCredential.user.emailVerified;
      verifiedUser
        ? setError(null)
        : setError('Please go to your e-mail and verify using the link.');
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
      setNotification({ message: err.message, severity: 'error' });
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};

export default useLogin;
