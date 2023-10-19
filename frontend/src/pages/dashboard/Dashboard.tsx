import React from 'react';
import StudentDashboard from '../../components/courses/Students';

const Dashboard: React.FC = () => {
  return <StudentDashboard currentUser={null} allCourses={[]} isLoading={false} error={null} />;
};

export default Dashboard;
