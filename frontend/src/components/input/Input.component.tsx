import React, { ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  type: string;
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
  isRequired?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  isRequired,
  type,
  placeholder,
  value,
  setValue,
}: InputProps) => {
  return (
    <div className={styles.input}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        className={styles.inputText}
        required={isRequired}
        type={type}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default Input;
