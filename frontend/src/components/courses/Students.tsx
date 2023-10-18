import React from 'react';
import { Link } from 'react-router-dom';
import { AllCourseFields, User } from '../../types/component';
import Filters from './Filters';
import CourseList from './CourseList';
import Button from '../button/Button.component';

interface UserListProps {
  currentUser: User | null;
  allCourses: AllCourseFields[];
  isLoading: boolean;
  error: Error | null;
}

const StudentDashboard: React.FC<UserListProps> = ({
  currentUser,
  allCourses,
  isLoading,
  error,
}) => {
  const userType = currentUser?.user_type;

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='error'>{error?.message}</div>;
  }

  return (
    <div>
      <div className='create-course-wrapper'>
        <div className='create-course'>
          <h2>Course</h2>
          {userType === 'Mentor' && (
            <Link to='/add-course'>
              <Button isLoading={isLoading} label={'Create New Course+'} type='submit' />
            </Link>
          )}
        </div>
      </div>
      <Filters />
      <CourseList
        currentUser={currentUser}
        allCourses={allCourses}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default StudentDashboard;
