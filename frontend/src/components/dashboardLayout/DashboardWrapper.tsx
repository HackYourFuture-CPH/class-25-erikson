import { ReactNode, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import signout from '../../hooks/signout';
import Person from '../../assets/icons/person.svg';
import Bookmark from '../../assets/dashboard/bookmark.svg';
import Document from '../../assets/dashboard/document.svg';
import Video from '../../assets/dashboard/video.svg';
import Folder from '../../assets/dashboard/folder.svg';
import Calender from '../../assets/dashboard/calendar.svg';
import Goals from '../../assets/dashboard/goals.svg';
import Dashboard from '../../assets/dashboard/dashboard.svg';
import Dashboard2 from '../../assets/dashboard/dashboard2.svg';
import './Dashboard.css';

type FormWrapperProps = {
  children: ReactNode;
};

const DashboardWrapper = ({ children }: FormWrapperProps) => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const [isSidebarOpen] = useState(false);

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

  const handleArrow = (): void => {
    const logout = document.querySelector('.dropdown-menu');
    const arrow = document.querySelector('.handleArrow')!;

    logout?.classList.toggle('active');
    arrow.innerHTML = logout?.classList.contains('active') ? '▲' : '▼';
  };

  return (
    <>
      <div className='dashboard-layout'>
        <nav className={`sidebar ${isSidebarOpen ? 'open' : 'hidden'}`}>
          <div className='dashboard-logo'>
            <img src={Dashboard} alt='dashboard' />
          </div>

          <div className='sidebar-menu'>
            <div className='sidebar-item'>
              <div>
                <img src={Dashboard2} alt='dashboard2' />
                <p>Dashboard</p>
              </div>
            </div>

            <div className='sidebar-item'>
              <div>
                <img src={Goals} alt='dashboard2' />
                <p>Goals</p>
              </div>
            </div>

            <div className='sidebar-item'>
              <div>
                <img src={Video} alt='live schedule' />
                <p>Live Schedule</p>
              </div>
            </div>

            <div className='sidebar-item'>
              <div>
                <img src={Calender} alt='class schedule' />
                <p>Class Schedule</p>
              </div>
            </div>

            <div className='sidebar-item'>
              <div>
                <img src={Bookmark} alt='course' />
                <p>Course</p>
              </div>
            </div>

            <div className='sidebar-item'>
              <div>
                <img src={Document} alt='resources' />

                <p>Resources</p>
              </div>
            </div>

            <div className='sidebar-item'>
              <div>
                <img src={Folder} alt='directory' />
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
                <img src='images/menu.svg' alt='menu' />
              </p>
              <img className='logo-mobile' src='images/Logo.svg' alt='mobile-logo' />
            </div>
          </div>

          <div> {children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardWrapper;
