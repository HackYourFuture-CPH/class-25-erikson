import React from 'react';
import styles from './Button.module.css';
import { CircularProgress } from '@mui/material';

interface InputProps {
  label: string;
  leftIcon?: any;
  rightIcon?: any;
  onClick?: any;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<InputProps> = ({
  label,
  type,
  leftIcon,
  rightIcon,
  isLoading,
  disabled,
  onClick,
}: InputProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={styles.button}
      type={type}
      onClick={onClick}
    >
      {isLoading && (
        <CircularProgress
          size={20}
          sx={{
            color: () => '#ffffff',
          }}
          className={styles.spinner}
        />
      )}
      {leftIcon && <img className={styles.leftIcon} src={leftIcon} alt='Left button icon' />}
      {label}
      {rightIcon && <img className={styles.rightIcon} src={rightIcon} alt='right button icon' />}
    </button>
  );
};

export default Button;
