import React from 'react';
import signout from '../../hooks/signout';
import StudentDashboard from '../../components/courses/Students';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardWrapper from './DashboardWrapper';

const Dashboard: React.FC = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  if (!user?.emailVerified) {
    navigate("/login", { replace: true });
  }

  const handleLogout = async (): Promise<void> => {
    setUser(null);
    await signout();
    navigate("/login", { replace: true })
  };

  return (
    <DashboardWrapper>
    <div>
      <StudentDashboard />
    </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
