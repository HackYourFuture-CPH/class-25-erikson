import { ReactNode } from 'react';
import styles from './FormWrapper.module.css';

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <div className={styles.formWrapper}>
      <ul className={styles.formTitleContainer}>
        {['Overview', 'Lessons', 'Sales Page'].map((each) => (
          <li key={each} className={each === title ? styles.active : 'gray'}>
            {each}
          </li>
        ))}
      </ul>
      <div className={styles.formContent}>
        <div className={styles.formChildren}>{children}</div>
      </div>
    </div>
  );
};

export default FormWrapper;
