import { ReactNode } from 'react';
import styles from './FormWrapper.module.css';

type FormWrapperProps = {
  title: string;
  noStyle?: boolean;
  children: ReactNode;
};

const FormWrapper = ({ title, children, noStyle }: FormWrapperProps) => {
  return (
    <div className={styles.formWrapper}>
      <ul className={styles.formTitleContainer}>
        {['Overview', 'Lessons', 'Sales Page'].map((each) => (
          <li key={each} className={each === title ? styles.active : 'gray'}>
            {each}
          </li>
        ))}
      </ul>
      <div className={!noStyle ? styles.formContent : undefined}>
        <div className={!noStyle ? styles.formChildren : undefined}>{children}</div>
      </div>
    </div>
  );
};

export default FormWrapper;
