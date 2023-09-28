import React from 'react';
import signout from '../../hooks/signout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (!user?.emailVerified) {
    navigate('/login', { replace: true });
  }

  const handleLogout = async (): Promise<void> => {
    await signout();
  };

  return (
    <div>
      <h1>Hey {user?.displayName}, Welcome to the e-learning-platform.</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
