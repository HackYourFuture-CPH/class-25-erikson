import { AlertColor } from '@mui/material';
import { User } from 'firebase/auth';

export interface AuthContextStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface NotificationInterface {
  message: string;
  severity: AlertColor;
}

export interface NotificationState {
  notification: NotificationInterface | null;
  setNotification: (notification: NotificationInterface | null) => void;
}

export interface ErrorState {
  error: string | null;
  setError: (error: string | null) => void;
}

export interface ResetState {
  error: string | null;
  successMessage: string | null;
  setError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
}
