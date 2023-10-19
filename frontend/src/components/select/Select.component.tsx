import React, { ChangeEvent } from 'react';
import styles from './Select.module.css';

interface SelectProps {
  label: string;
  value: string;
  items: { label: string; value: string }[];
  setValue: (val: string) => void;
  placeholder?: string;
  isRequired?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  isRequired,
  items,
  placeholder,
  value,
  setValue,
}: SelectProps) => {
  return (
    <div className={styles.select}>
      <label className={styles.selectLabel}>{label}</label>
      <select
        className={styles.selectText}
        required={isRequired}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)}
        value={value}
      >
        {(items || []).map((item) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
