import React, { ChangeEvent } from 'react';
import styles from './Checkbox.module.css';

interface InputProps {
  label: string;
  value: boolean;
  setValue: (val: boolean) => void;
}

const Checkbox: React.FC<InputProps> = ({ label, value, setValue }: InputProps) => {
  return (
    <div className={styles.checkbox}>
      <input
        className={styles.checkboxElement}
        type='checkbox'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.checked)}
        checked={value}
      />
      <label className={styles.checkboxLabel}>{label}</label>
    </div>
  );
};

export default Checkbox;
