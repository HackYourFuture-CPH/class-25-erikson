import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useReset from '../../hooks/useReset';
import usePasswordStore from '../../store/resetpage.store';
import styles from './Password.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import Input from '../../components/Input/Input.component';
import Button from '../../components/Button/Button.component';

const Password: React.FC = () => {
  const { email, setEmail } = usePasswordStore();
  const { resetPassword, error, successMessage } = useReset();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (user?.emailVerified) {
    navigate('/courses', { replace: true });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await resetPassword(email);
  };

  return (
    <div className='auth-page-layout'>
      <div className='auth-top'>
        <img src='images/auth-logo.svg' alt='logo' />
      </div>

      <div className={styles.formWrapper}>
        <div className='auth-left'>
          <form className={styles.resetForm} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Forgot Password</h2>
            <p className={styles.subTitle}>We will send you reset password link on your mail</p>
            <div className={styles.inputElement}>
              <Input
                label={'Email:'}
                type={'email'}
                isRequired={true}
                value={email}
                setValue={setEmail}
                placeholder='Enter your email'
              />
            </div>

            <div className={styles.submitButton}>
              <Button label={'Reset Password'} type='submit' />
            </div>

            {successMessage && <p className='success-message'>{successMessage}</p>}
            {error && <p className='error-message'>{error}</p>}
          </form>
        </div>

        <div className='auth-right'>
          <img src='images/restore-pswrd.svg' alt='restoring of pass' />
        </div>
      </div>
    </div>
  );
};

export default Password;
