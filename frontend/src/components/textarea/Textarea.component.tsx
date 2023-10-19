import React, { ChangeEvent } from 'react';
import styles from './Textarea.module.css';

interface TextareaProps {
  label: string;
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
  isRequired?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  isRequired,
  placeholder,
  value,
  setValue,
}: TextareaProps) => {
  return (
    <div className={styles.textarea}>
      <label className={styles.textareaLabel}>{label}</label>
      <textarea
        rows={3}
        className={styles.textareaText}
        required={isRequired}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default Textarea;
