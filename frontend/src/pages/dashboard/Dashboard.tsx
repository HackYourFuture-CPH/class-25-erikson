import React, { useEffect } from 'react';
import StudentDashboard from '../../components/courses/Students';
import DashboardWrapper from '../../components/dashboardLayout/DashboardWrapper';

const Dashboard: React.FC = () => {
  return (
    <DashboardWrapper>
      <StudentDashboard />
    </DashboardWrapper>
  );
};

export default Dashboard;
