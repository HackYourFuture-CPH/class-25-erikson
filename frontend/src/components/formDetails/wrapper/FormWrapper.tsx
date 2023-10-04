import { ReactNode } from 'react';
import styles from './FormWrapper.module.css';

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.formHeading}>{title}</h2>
      <div className={styles.formChildren}>{children}</div>
    </div>
  );
};

export default FormWrapper;
