import React from 'react';
import StudentDashboard from '../../components/courses/Students';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardWrapper from '../../components/dashboardLayout/DashboardWrapper';

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (!user?.emailVerified) {
    navigate('/login', { replace: true });
  }

  return (
    <DashboardWrapper>
      <StudentDashboard />
    </DashboardWrapper>
  );
};

export default Dashboard;
