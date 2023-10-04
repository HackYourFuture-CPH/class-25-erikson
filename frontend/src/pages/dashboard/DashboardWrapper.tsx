import { ReactNode, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { users } from '../../data/data';
import { Link, useNavigate } from 'react-router-dom';
import signout from '../../hooks/signout';
import Person from '../../assets/person.svg';
import './Dashboard.css';
import React from 'react';

type FormWrapperProps = {
  children: ReactNode;
};

const DashboardWrapper = ({ children }: FormWrapperProps) => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const userType = users[1].type;
  const [isSidebarOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = async (): Promise<void> => {
    setUser(null);
    await signout();
    navigate('/login', { replace: true });
  };

  const toggleSidebar = (): void => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open');
    }
  };

  return (
    <>
      <div className='dashboard-layout'>
        <nav className={`sidebar ${isSidebarOpen ? 'open' : 'hidden'}`}>
          <div className='dashboard-logo'>
            <img src='images/dashboard.svg' alt='dashboard' />
          </div>

          <div className='sidebar-menu'>
            <div className='sidebar-item'>
              <div>
                <img src='images/dashboard2.svg' alt='dashboard2' />
                <p>Dashboard</p>
              </div>
            </div>

            <div className='sidebar-item'>
              <div>
                <img src='images/goals.svg' alt='dashboard2' />
                <p>Goals</p>
              </div>
            </div>

            <div className='sidebar-item'>
              <div>
                <img src='images/video.svg' alt='live schedule' />
                <p>Live Schedule</p>
              </div>
            </div>

            <div className='sidebar-item'>
              <div>
                <img src='images/calendar.svg' alt='class schedule' />
                <p>Class Schedule</p>
              </div>
            </div>

            <div className='sidebar-item'>
              <div>
                <img src='images/bookmark.svg' alt='course' />
                <p>Course</p>
              </div>
            </div>

            <div className='sidebar-item'>
              <div>
                <img src='images/document.svg' alt='resources' />

                <p>Resources</p>
              </div>
            </div>

            <div className='sidebar-item'>
              <div>
                <img src='images/folder.svg' alt='directory' />
                <p>Directory</p>
              </div>
            </div>
          </div>
        </nav>

        <div className='main'>
          <div className='top-bar-container'>
            <div className='top-bar'>
              <form>
                <input
                  className='search'
                  type='text'
                  id='search'
                  name='search'
                  placeholder='Search Anything'
                />
              </form>

              <div className='user'>
                <img className='user-img' src={Person} alt='user-display' />
                <p onClick={toggleDropdown}>
                  {user?.displayName} {isDropdownVisible ? '▲' : '▼'}
                </p>
                <span className='down-arrow'></span>
                {isDropdownVisible && (
                  <div className='dropdown-menu'>
                    <button onClick={handleLogout}>Log out</button>
                  </div>
                )}
              </div>
            </div>

            <div className='top-bar-phone-content'>
              <p className='sidebar-toggle-button' onClick={toggleSidebar}>
                <img src='images/menu.svg' alt='menu' />
              </p>
              <img className='logo-mobile' src='images/Logo.svg' alt='mobile-logo' />
            </div>
          </div>

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
          <div> {children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardWrapper;
