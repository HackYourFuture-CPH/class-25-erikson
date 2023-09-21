import React, { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { create } from "zustand";
import useLogin from "../../hooks/useLogin";
import "./Login.css";
type LoginStore = {
  email: string;
  password: string;
  rememberMe: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (remember: boolean) => void;
  resetForm: () => void;
};

const useLoginStore = create<LoginStore>((set) => ({
  email: localStorage.getItem("rememberedEmail") || "",
  password: "",
  rememberMe: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setRememberMe: (rememberMe) => {
    set((state) => {
      if (rememberMe === true) {
        localStorage.setItem("rememberedEmail", state.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      return { ...state, rememberMe };
    });
  },
  resetForm: () => set({ email: "", password: "", rememberMe: false }),
}));

const Login: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    resetForm,
  } = useLoginStore();
  const { login, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await login(email, password, rememberMe);
    rememberMe ? setPassword("") : resetForm();
    navigate("/dashboard");
  };

  return (
    <div className="page-layout">
      <div className="top">
        <img src="images/auth-logo.png" alt="logo" />
      </div>
      <div className="form-img">
        <div className="left">
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>

              <div className="input-group">
                <label>
                  <span>Email:</span>
                  <input
                    className="text-input"
                    required
                    type="email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    value={email}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  <span>Password:</span>
                  <input
                    className="text-input"
                    required
                    type="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    value={password}
                  />
                </label>
              </div>
              <div className="row-wrap-remember-me">
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
                    <span>Remember me</span>
                  </label>
                </div>
                <div className="forgot-password">
                  <p>
                    <Link to="/password">Forgot password?</Link>
                  </p>
                </div>
              </div>

              <div className="div-button">
                <button className="login-button" type="submit">
                  Login
                </button>
              </div>

              {error && <p>{error}</p>}
            </form>
          </div>
          <p className="redirect">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="right">
          <img src="images/loginCover.png" alt="hands-show" />
        </div>
      </div>
    </div>
  );
};

export default Login;
