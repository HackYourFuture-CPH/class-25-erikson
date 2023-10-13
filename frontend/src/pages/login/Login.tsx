import React, { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import useLoginStore from '../../store/loginpage.store';
import styles from './Login.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import Input from '../../components/input/Input.component';
import Checkbox from '../../components/checkbox/Checkbox.component';
import Button from '../../components/button/Button.component';

const Login: React.FC = () => {
  const { email, setEmail, password, setPassword, rememberMe, setRememberMe, resetForm } =
    useLoginStore();
  const { login, error } = useLogin();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (user?.emailVerified) {
    navigate('/courses', { replace: true });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await login(email, password);
    rememberMe ? setPassword('') : resetForm();
  };

  return (
    <div className='auth-page-layout'>
      <div className='auth-top'>
        <img src='images/auth-logo.svg' alt='logo' />
      </div>

      <div className={styles.formWrapper}>
        <div className='auth-left'>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Log in</h2>
            <p className={styles.subTitle}>Easy step to enter the platform</p>
            <div className={styles.inputElement}>
              <Input
                label={'Email:'}
                type={'email'}
                isRequired={true}
                value={email}
                setValue={setEmail}
                placeholder='Enter email'
              />
            </div>
            <div className={styles.inputElement}>
              <Input
                label={'Password:'}
                type={'password'}
                isRequired={true}
                value={password}
                setValue={setPassword}
                placeholder='Enter password'
              />
            </div>
            <div className={styles.rememberMe}>
              <Checkbox label={'Remember me'} value={rememberMe} setValue={setRememberMe} />
              <Link className={styles.forgotPassword} to='/password'>
                Forgot password?
              </Link>
            </div>

            <div className={styles.submitButton}>
              <Button label={'Login'} type='submit' />
            </div>
            {error && <p>{error}</p>}
          </form>

          <p className={styles.redirect}>
            <span>Don't have an account?</span>
            <Link to='/signup' className={styles.redirectLink}>
              Sign Up
            </Link>
          </p>
        </div>

        <div className='auth-right'>
          <img src='images/loginCover.svg' alt='hands-show' />
        </div>
      </div>
    </div>
  );
};

export default Login;
