import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AllCourseFields, User } from '../../types/component';
import signout from '../../hooks/signout';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import Person from '../../assets/icons/person.svg';
import Bookmark from '../../assets/dashboard/bookmark.svg';
import Document from '../../assets/dashboard/document.svg';
import Video from '../../assets/dashboard/video.svg';
import Folder from '../../assets/dashboard/folder.svg';
import Calender from '../../assets/dashboard/calendar.svg';
import Goals from '../../assets/dashboard/goals.svg';
import Dashboard from '../../assets/dashboard/dashboard.svg';
import Dashboard2 from '../../assets/dashboard/dashboard2.svg';
import Mobile from '../../assets/dashboard/mobile.svg';
import Menu from '../../assets/dashboard/menu.svg';
import './Dashboard.css';

type FormWrapperProps = {
  children: ReactNode;
};

const initialUser: User = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  uid: '',
  user_type: '',
};

const initialCourse: AllCourseFields[] = [
  {
    id: 0,
    course_title: '',
    course_category: '',
    course_image: '',
    course_price: 0,
    mentor: 0,
    students: [],
    lesson_count: 0,
  },
];

const DashboardWrapper = ({ children }: FormWrapperProps) => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);
  const [allCourses, setAllCourses] = useState<AllCourseFields[] | null>(initialCourse);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    data: fetchUser,
    isLoading: loading,
    error: notLoading,
  } = useAxiosFetch<User>(`api/user/uid/${user?.uid}`);
  const { data: fetchCourses } = useAxiosFetch<AllCourseFields[]>('/api/courses/all');

  useEffect(() => {
    const checkEmailVerification = () => {
      if (user && !user.emailVerified) {
        navigate('/login', { replace: true });
      } else {
        if (fetchUser && fetchCourses) {
          setCurrentUser(fetchUser);
          setIsLoading(loading);
          setAllCourses(fetchCourses);
        } else {
          setError(notLoading);
          console.error('Error fetching data:', notLoading);
        }
      }
    };

    checkEmailVerification();
  }, [user, navigate, fetchUser, fetchCourses, loading, notLoading, setCurrentUser, setAllCourses]);

  const handleLogout = async (): Promise<void> => {
    setUser(null);
    await signout();
    navigate('/login', { replace: true });
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open');
    }
  };

  const handleArrow = (): void => {
    const logout = document.querySelector('.dropdown-menu');
    const arrow = document.querySelector('.handleArrow')!;

    logout?.classList.toggle('active');
    arrow.innerHTML = logout?.classList.contains('active') ? '▲' : '▼';
  };

  return (
    <div className='dashboard-layout'>
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'hidden'}`}>
        <div className='sticky'>
          <div className='dashboard-logo'>
            <img src={Dashboard} alt='dashboard' />
          </div>

          <div className='sidebar-menu'>
            <div className='sidebar-item'>
              <Link to='/my-courses'>
                <div>
                  <img src={Dashboard2} alt='dashboard2' />
                  <p>Dashboard</p>
                </div>
              </Link>
            </div>

            <div className='sidebar-item'>
              <Link to='/underconstruction'>
                <div>
                  <img src={Goals} alt='dashboard2' />
                  <p>Goals</p>
                </div>
              </Link>
            </div>

            <div className='sidebar-item'>
              <Link to='/underconstruction'>
                <div>
                  <img src={Video} alt='live schedule' />
                  <p>Live Schedule</p>
                </div>
              </Link>
            </div>

            <div className='sidebar-item'>
              <Link to='/underconstruction'>
                <div>
                  <img src={Calender} alt='class schedule' />
                  <p>Class Schedule</p>
                </div>
              </Link>
            </div>

            <div
              className={`sidebar-item ${
                location.pathname === '/courses' ? 'nav-link-active' : ''
              }`}
            >
              <Link to='/courses'>
                <div>
                  <img src={Bookmark} alt='course' />
                  <p>Course</p>
                </div>
              </Link>
            </div>

            <div className='sidebar-item'>
              <Link to='/underconstruction'>
                <div>
                  <img src={Document} alt='resources' />

                  <p>Resources</p>
                </div>
              </Link>
            </div>

            <div className='sidebar-item'>
              <Link to='/underconstruction'>
                <div>
                  <img src={Folder} alt='directory' />
                  <p>Directory</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className='main'>
        <div className='top-bar-container'>
          <div className='top-bar'>
            <div></div>
            <div className='user'>
              <div className='user-info'>
                <img className='user-img' src={Person} alt='user-display' />
                <p>
                  {user?.displayName}{' '}
                  <span className='handleArrow' onClick={handleArrow}>
                    ▼
                  </span>
                </p>
              </div>
              <div className='dropdown-menu'>
                <button onClick={handleLogout}>Log out</button>
              </div>
            </div>
          </div>

          <div className='top-bar-phone-content'>
            <p className='sidebar-toggle-button' onClick={toggleSidebar}>
              <img src={Menu} alt='menu' />
            </p>
            {isSidebarOpen ? null : <img className='logo-mobile' src={Mobile} alt='logo-mobile' />}
          </div>
        </div>

        <div className='dashboard-wrapper'>
          {React.Children.toArray(children).map((child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as ReactElement, {
                currentUser,
                allCourses,
                isLoading,
                error,
              });
            }
            return child;
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
