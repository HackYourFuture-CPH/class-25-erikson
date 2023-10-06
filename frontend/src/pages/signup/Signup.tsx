import React, { useEffect, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';
import useSignupStore from '../../store/signuppage.store';
import styles from './Signup.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import Input from '../../components/Input/Input.component';
import Checkbox from '../../components/Checkbox/Checkbox.component';
import Button from '../../components/Button/Button.component';

const Signup: React.FC = () => {
  const {
    userType,
    setUserType,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
  } = useSignupStore();

  const { signup, error } = useSignup();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

  if (user?.emailVerified) {
    navigate('/courses', { replace: true });
  }

  useEffect(() => {
    const reqFields = [userType, firstName, lastName, email, password];
    const isNotEmpty = reqFields.every((field) => field !== '');
    setIsFormValid(isNotEmpty);
  }, [userType, firstName, lastName, email, password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await signup(email, password, firstName);
  };

  return (
    <div className='auth-page-layout'>
      <div className='auth-top'>
        <img src='images/auth-logo.svg' alt='logo' />
      </div>

      <div className={styles.formWrapper}>
        <div className='auth-left'>
          <form className={styles.signupForm} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Sign up</h2>
            <p className={styles.subTitle}>Select subscription</p>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type='radio'
                  value='Student'
                  checked={userType === 'Student'}
                  onChange={() => setUserType('Student')}
                />
                <span className={styles.radioLabel}>Student</span>
              </label>

              <label>
                <input
                  type='radio'
                  value='Mentor'
                  checked={userType === 'Mentor'}
                  onChange={() => setUserType('Mentor')}
                />
                <span className={styles.radioLabel}>Mentor</span>
              </label>
            </div>
            <div className={styles.nameInput}>
              <Input
                label={'First name:'}
                type={'text'}
                isRequired={true}
                value={firstName.trimStart()}
                setValue={setFirstName}
                placeholder='First name'
              />
              <Input
                label={'Last name:'}
                type={'text'}
                isRequired={true}
                value={lastName.trimStart()}
                setValue={setLastName}
                placeholder='Last name'
              />
            </div>
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
                value={password.trim()}
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
              <Button label={'Sign up'} type='submit' />
            </div>
          </form>

          <p className={styles.redirect}>
            <span>Already have an account?</span>
            <Link to='/login' className={styles.redirectLink}>
              Log in
            </Link>
          </p>

          {error && <p>{error}</p>}
        </div>

        <div className='auth-right'>
          <img src='images/hands-show.svg' alt='hands-show' />
        </div>
      </div>
    </div>
  );
};

export default Signup;
