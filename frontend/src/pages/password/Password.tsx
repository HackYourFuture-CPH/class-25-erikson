import React, { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { create } from 'zustand';
import { auth, sendPasswordResetEmail } from '../../firebase/config';
import "./Password.css";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

type PasswordStore = {
  email: string;
  error: string | null;
  successMessage: string | null;
  setEmail: (email: string) => void;
  setError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
};

const usePasswordStore = create<PasswordStore>((set) => ({
  email: '',
  error: null,
  successMessage: null,
  setEmail: (email) => set({ email }),
  setError: (error) => set({ error }),
  setSuccessMessage: (message) => set({ successMessage: message }),
}));

const Password: React.FC = () => {
  const { email, setEmail, error, setError, successMessage, setSuccessMessage } = usePasswordStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setError(null);
      setSuccessMessage('Password reset email sent. Check your inbox.');
    }
    catch (err: any) {
      setError(err.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="password-layout">
      
      <div className="top">
        <img src="images/auth-logo.png" alt="logo" />
      </div>

      <div className="container">
        <div className="restore-form">
          <Link to="/login"><KeyboardBackspaceIcon /></Link>

          <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <p className="gray">We will send you reset password link on your mail</p>
            <div className="input-group">
              <label>
                Email:
                <input
                  required
                  type="email"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter your email"
                  className="text-input"
                />
              </label>
            </div>

            <button className="btn" type="submit">
              Reset Password
            </button>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        <div className="restore-pswrd">
          <img src="images/restore-pswrd.png" alt="restoring of pass" />
        </div>
      </div>
    </div>
  );
};

export default Password;
