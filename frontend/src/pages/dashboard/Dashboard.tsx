import React, { useEffect } from 'react';
import StudentDashboard from '../../components/courses/Students';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardWrapper from '../../components/dashboardLayout/DashboardWrapper';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useUserStore from '../../store/user.store';

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const { setCurrentUser } = useUserStore();
  const navigate = useNavigate();

  const { data: fetchUser, isLoading, error } = useAxiosFetch<any>(`api/user/uid/${user?.uid}`)
  
  useEffect(() => {
    if (fetchUser) {
      setCurrentUser(fetchUser)
    };

    if (!user?.emailVerified) {
      navigate('/login', { replace: true });
    }

  }, [fetchUser, setCurrentUser]);
  
  if (!user?.emailVerified) {
    navigate('/login', { replace: true });
  };

  if (isLoading) {
    return <div className='loadin'>Loading...</div>;
  };

  if (error) {
    return <div className='error'>{error?.message}</div>
  };

  return (
    <DashboardWrapper>
      <StudentDashboard />
    </DashboardWrapper>
  );
};

export default Dashboard;
