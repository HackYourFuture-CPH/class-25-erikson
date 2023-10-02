import React, { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useReset from '../../hooks/useReset';
import usePasswordStore from '../../store/resetpage.store';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './Password.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const Password: React.FC = () => {
  const { email, setEmail } = usePasswordStore();
  const { resetPassword, error, successMessage } = useReset();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (user?.emailVerified) {
    navigate('/dashboard', { replace: true });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await resetPassword(email);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const btnClassName = emailRegex.test(email) ? 'valid-btn' : 'invalid-btn';

  return (
    <div className='password-layout'>
      <div className='top'>
        <img src='images/auth-logo.svg' alt='logo' />
      </div>

      <div className='container'>
        <div className='restore-form'>
          <Link to='/login'>
            <KeyboardBackspaceIcon />
          </Link>

          <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <p className='gray'>We will send you reset password link on your mail</p>
            <div className='input-group'>
              <label>
                Email:
                <input
                  required
                  type='email'
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  value={email}
                  placeholder='Enter your email'
                  className='text-input'
                />
              </label>
            </div>

            <button className={btnClassName} type='submit'>
              Reset Password
            </button>

            {successMessage && <p className='success-message'>{successMessage}</p>}
            {error && <p className='error-message'>{error}</p>}
          </form>
        </div>

        <div className='restore-pswrd'>
          <img src='images/restore-pswrd.svg' alt='restoring of pass' />
        </div>
      </div>
    </div>
  );
};

export default Password;
