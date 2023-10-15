import React from 'react';
import { Link } from 'react-router-dom';
import Filters from './Filters';
import CourseList from './CourseList';
import useUserStore from '../../store/user.store';

const StudentDashboard: React.FC = () => {
  const { currentUser } = useUserStore();
  const userType = currentUser?.user_type;

  return (
    <div>
      <div className='create-course-wrapper'>
        <div className='create-course'>
          <h2>Course</h2>
          {userType === 'Mentor' && (
            <Link to='/add-course'>
              <button className='create-course-btn'>Create New Course+</button>
            </Link>
          )}
        </div>
      </div>
      <Filters />
      <CourseList />
    </div>
  );
};

export default StudentDashboard;
