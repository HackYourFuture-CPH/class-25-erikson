import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import Filters from './Filters';
import CourseList from './CourseList';
import useUserStore from '../../store/user.store';

const StudentDashboard: React.FC = () => {
  const { user } = useAuthContext();
  const { currentUser, setCurrentUser } = useUserStore()

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (user?.emailVerified) {
          const idToken = await user.getIdToken();

          const response = await axios.get(`api/user/uid/${user.uid}`, {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          });
          
          if (isMounted) {
            setCurrentUser(response.data);
          }
        }
        else {
          if (isMounted) {
            setCurrentUser(null);
          }
        }
      }
      catch (error) {
        console.error('Error fetching currentUser data:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user, setCurrentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const userType = currentUser.user_type;

  return (
    <div>
      <div className='create-course-wrapper'>
        <div className='create-course'>
          <h2>Course</h2>
          {userType === "Mentor" && (
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
