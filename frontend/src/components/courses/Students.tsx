import React from 'react';

import Filters from './Filters';
import CourseList from './CourseList';

const StudentDashboard: React.FC = () => {
  return (
    <div>
      {/** <Navbar />*/}
      <Filters />
      <CourseList />
    </div>
  );
};

export default StudentDashboard;
