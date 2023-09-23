import { auth } from '../firebase/config';

const useLogout = () => {
  const logout = async () => {
    try {
      await auth.signOut();
    }
    catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return logout;
};

export default useLogout;
