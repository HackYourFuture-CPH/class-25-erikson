import { auth } from '../firebase/config';

const signout = async () => {
  try {
    await auth.signOut();
  }
  catch (error) {
    console.error('Logout failed:', error);
  }
};

export default signout;
