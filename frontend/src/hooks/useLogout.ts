import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';
import { auth } from '../firebase/config';

const useLogout = () => {
  const context = useContext(AuthContext) as AuthContextType;

  if (!context) {
    throw new Error('useLogout must be used within an AuthProvider');
  }

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
