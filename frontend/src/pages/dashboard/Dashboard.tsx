import React, { useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/component';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useUserStore from '../../store/user.store';
import DashboardWrapper from '../../components/dashboardLayout/DashboardWrapper';
import StudentDashboard from '../../components/courses/Students';

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const { setCurrentUser } = useUserStore();
  const navigate = useNavigate();

  const { data: fetchUser, isLoading, error } = useAxiosFetch<User>(`api/user/uid/${user?.uid}`);

  useEffect(() => {
    if (fetchUser) {
      setCurrentUser(fetchUser);
    }

    if (!user?.emailVerified) {
      navigate('/login', { replace: true });
    }
  }, [fetchUser, setCurrentUser, user?.emailVerified, navigate]);

  if (!user?.emailVerified) {
    navigate('/login', { replace: true });
  }

  if (isLoading) {
    return <div className='loadin'>Loading...</div>;
  }

  if (error) {
    return <div className='error'>{error?.message}</div>;
  }

  return (
    <DashboardWrapper>
      <StudentDashboard />
    </DashboardWrapper>
  );
};

export default Dashboard;
