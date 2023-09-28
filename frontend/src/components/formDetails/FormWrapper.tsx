import { ReactNode } from 'react';

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <h2 style={{ textAlign: 'center', margin: 0, marginBottom: '2rem' }}>{title}</h2>
      <div
        style={{
          display: 'block',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default FormWrapper;
