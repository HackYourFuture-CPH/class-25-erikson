import React from 'react';
import signout from '../../hooks/signout';
import StudentDashboard from '../../components/courses/Students';

const Dashboard: React.FC = () => {

  const handleLogout = async (): Promise<void> => {
    await signout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <StudentDashboard />
    </div>
  );
};

export default Dashboard;
