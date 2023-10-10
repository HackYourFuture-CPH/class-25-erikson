import React from 'react';
import styles from './Button.module.css';

interface InputProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<InputProps> = ({ label, type }: InputProps) => {
  return (
    <button className={styles.button} type={type}>
      {label}
    </button>
  );
};

export default Button;
