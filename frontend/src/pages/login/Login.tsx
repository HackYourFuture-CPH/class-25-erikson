import React, { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import useLogin from '../../hooks/useLogin';

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
  email: localStorage.getItem('rememberedEmail') || '',
  password: '',
  rememberMe: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setRememberMe: (rememberMe) => {
    set((state) => {
      if (rememberMe === true) {
        localStorage.setItem('rememberedEmail', state.email);
      }
      else {
        localStorage.removeItem('rememberedEmail');
      }
      return { ...state, rememberMe };
    });
  },
  resetForm: () => set({ email: '', password: '', rememberMe: false })
}));

const Login: React.FC = () => {
  const { email, setEmail, password, setPassword, rememberMe, setRememberMe, resetForm } = useLoginStore();
  const { login, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await login(email, password, rememberMe);
    rememberMe ? setPassword('') : resetForm();
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>
        <span>Email:</span>
        <input
          required
          type="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          required
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <label>
        <input
          type="checkbox"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
          checked={rememberMe}
        />
        <span>Remember me</span>
      </label>

      <p>
        <Link to="/password">Forgot password?</Link>
      </p>

      <button className="btn" type="submit">
        Login
      </button>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>

      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
