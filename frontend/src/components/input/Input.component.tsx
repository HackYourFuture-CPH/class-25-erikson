import React, { ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  value: string | number;
  setValue: (val: string) => void;
  type?: string;
  autoFocus?: boolean;
  placeholder?: string;
  isRequired?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  isRequired,
  type,
  placeholder,
  autoFocus,
  value,
  setValue,
}: InputProps) => {
  return (
    <div className={styles.input}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        className={styles.inputText}
        required={isRequired}
        autoFocus={autoFocus}
        type={type || 'text'}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default Input;
