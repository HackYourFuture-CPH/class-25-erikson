import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import Filters from './Filters';
import CourseList from './CourseList';
import useUserStore from '../../store/user.store';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import Button from '../button/Button.component';

const StudentDashboard: React.FC = () => {
  const { currentUser, setCurrentUser } = useUserStore();
  const { user } = useAuthContext();

  const { data: fetchUser, isLoading, error } = useAxiosFetch<any>(`api/user/uid/${user?.uid}`);

  useEffect(() => {
    if (fetchUser) {
      setCurrentUser(fetchUser);
    }
  }, [fetchUser, setCurrentUser]);

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
      <CourseList />
    </div>
  );
};

export default StudentDashboard;
