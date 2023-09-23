import React from 'react';
import useLogout from '../../hooks/useLogout';

const Dashboard: React.FC = () => {
  const logout = useLogout();

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
