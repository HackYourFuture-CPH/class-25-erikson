import React, { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';
import useSignupStore from '../../store/signuppage.store';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./Signup.css";

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
    setRememberMe
  } = useSignupStore();

  const { signup, error } = useSignup();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await signup(email, password);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType((event.target as HTMLInputElement).value);
  };

  return (

    <div className="signup-layout">
      <div className="top">
        <img src="images/auth-logo.png" alt="logo" />
      </div>
      <div className="form-img">
        <div className="left">
          <div className="signup-form">
            <form onSubmit={handleSubmit}>
              <h2>Signup</h2>
              <p className="gray">Select subscription</p>
              <RadioGroup 
                row
                value={userType}
                onChange={handleChange}
              >
                <FormControlLabel
                  control={<Radio />}
                  value="Student"
                  label="Student"
                />
                <FormControlLabel
                  control={<Radio />}
                  value="Mentor"
                  label="Mentor"
                />
              </RadioGroup>

              <div className="row-wrap">
                <div className="input-group">
                  <label>
                    First name:
                    <input
                      required
                      type="text"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                      value={firstName}
                      className="text-input"
                      placeholder="First name"
                    />
                  </label>
                </div>

                <div className="input-group">
                  <label>
                    Last name:
                    <input
                      required
                      type="text"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                      value={lastName}
                      className="text-input"
                      placeholder="Last name"
                    />
                  </label>
                </div>
              </div>

              <div className="input-group">
                <label>
                  Email:
                  <input
                    required
                    type="email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    value={email}
                    className="text-input"
                    placeholder="Enter email"
                  />
                </label>
              </div>

              <div className="input-group">
                <label>
                  Password:
                  <input
                    required
                    type="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    value={password}
                    className="text-input"
                    placeholder="Enter password"
                  />
                </label>
              </div>

              <div className="remember-me">
                <label>
                <input
                  className="remember-checkbox"
                  type="checkbox"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRememberMe(e.target.checked)
                  }
                  checked={rememberMe}
                />
                  Remember me
                </label>
              </div>

              <button className="btn" type="submit">
                Sign up
              </button>

              {error && <p>{error}</p>}
            </form>
          </div>
          <p className="redirect">
            Already have an account? <Link to="/login" className="signin-link">Sign in</Link>
          </p>
        </div>

        <div className="right">
            <img src="images/hands-show.png" alt="hands-show" />
        </div>

      </div>
    </div>
  );
};

export default Signup;
