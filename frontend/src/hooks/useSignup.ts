import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from '../firebase/config';
import useErrorSignupState from '../store/errorsignup.store';
import useNotificationStore from '../store/notification.store';
import axios from 'axios';

const useSignup = () => {
  const { setNotification } = useNotificationStore();
  const { error, setError } = useErrorSignupState();

  const signup = async (userType: string, email: string, password: string, firstName: string, lastName: string) => {
  //const signup = async (email: string, password: string, firstName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const capitalizedFirstWords = firstName
        .trim()
        .split(' ')
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
      const displayName = capitalizedFirstWords.join(' ');

      if (user) {
        await sendEmailVerification(user);
        await updateProfile(user, {
          displayName,
        });

        // To generate Firebase ID Token
        const idToken = await user.getIdToken();
        console.log(idToken)

        // Sending user data and ID token as a Bearer token to the server
        const userData = {
          email,
          uid: user.uid,
          first_name: firstName,
          last_name: lastName,
          user_type: userType,
        };

        // Send a POST request to your server with Bearer token in the Authorization header
        await axios.post('/api/user/create', userData, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        setError('A verification link has been sent to your e-mail.');
      }
    } catch (err: any) {
      setError(err.message);
      setNotification({ message: err.message, severity: 'error' });
    }
  };

  return { signup, error };
};

export default useSignup;
