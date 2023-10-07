import React from 'react';
// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useAuthContext } from '../../hooks/useAuthContext';
// import axios from 'axios';
// import useAxiosFetch from '../../hooks/useAxiosFetch';
import Filters from './Filters';
import CourseList from './CourseList';
import { users } from '../../data/data';

const StudentDashboard: React.FC = () => {
  const userType = users[1].type;
  // const { user } = useAuthContext();
  // const [currentUser, setCurrentUser] = useState(null);

  /*
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (user?.emailVerified) {
          const idToken = await user.getIdToken();

          const response = await axios.get(`/users/${user.uid}`, {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          });

          if (isMounted) {
            setCurrentUser(response.data);
          }
        } else {
          if (isMounted) {
            setCurrentUser(null);
          }
        }
      } catch (error) {
        console.error('Error fetching currentUser data:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const userType = currentUser.type;
  */

  /* 
  const { data: currentUserData, isLoading, error } = useAxiosFetch<any>(`/users/${user?.uid}`);

  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData);
    }
  }, [currentUserData]);

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='error'>{error?.message}</div>;
  }

  const userType = currentUser.type;
  */

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
