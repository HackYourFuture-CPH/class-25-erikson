import React from 'react';
import styles from './Button.module.css';
import { CircularProgress } from '@mui/material';

interface InputProps {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<InputProps> = ({ label, type, isLoading, disabled }: InputProps) => {
  return (
    <button disabled={disabled || isLoading} className={styles.button} type={type}>
      {isLoading && (
        <CircularProgress
          size={20}
          sx={{
            color: () => '#ffffff',
          }}
          className={styles.spinner}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
