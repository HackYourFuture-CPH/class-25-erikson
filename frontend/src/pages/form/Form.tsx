import React from 'react';
import { users } from '../../data/data';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const AddCourseForm: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const userType = users[1].type;

  if (!user?.emailVerified) {
    navigate('/login', { replace: true });
  }

  if (user?.emailVerified && userType === 'Student') {
    navigate('/courses');
  }

  return <div>Add Course Form</div>;
};

export default AddCourseForm;
