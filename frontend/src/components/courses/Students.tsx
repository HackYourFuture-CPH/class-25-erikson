import React from 'react';
import Filters from './Filters';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import { users } from '../../data/data';

const StudentDashboard: React.FC = () => {
  const userType = users[1].type;

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
