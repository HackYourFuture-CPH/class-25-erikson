import React from 'react';
import signout from '../../hooks/signout';
import './Dashboard.css';
import SearchIcon from '@mui/icons-material/Search';
const Dashboard: React.FC = () => {

  const handleLogout = async (): Promise<void> => {
    await signout();
  };

  return (
     <div>
    <div className='dashboard-layout'>
      <nav className='sidebar'>
       <div className='dashboard-logo'>
        <img src="images/dashboard.png" alt="dashboard" />
       </div>

        <div className='sidebar-menu'>
         <div className='sidebar-item'>
         <a href="#">
         <img src="images/Sidebar-Icon.png" alt="dashboard2" />
         <p>Dashboard</p>
        </a>
       
         </div>

         <div className='sidebar-item'>
         <a href="#">
        <img src="images/Activity.png" alt="dashboard2" />
        <p>Goals</p>
        </a>
       
         </div>
       

         <div className='sidebar-item'>
         <a href="#"> 
        <img src="images/Video.png" alt="live schedule" />
        <p>Live Schedule</p>
        </a>
        
         </div>

         <div className='sidebar-item'>

         <a href="#">
        <img src="images/Calendar.png" alt="class schedule" />
        <p>Class Schedule</p>
        </a>
       
         </div>

         <div className='sidebar-item'>
         <a href="#">
        <img src="images/Bookmark.png" alt="course" />
        <p>Course</p>
        </a>
        
         </div>

         <div className='sidebar-item'>
         <a href="#">
        <img src="images/Document.png" alt="resources" />
       
         <p>Resources</p>
         </a>
         </div>

         <div className='sidebar-item'>
         <a href="#">
        <img src="images/Folder.png" alt="directory" />
        <p>Directory</p>
        </a>
         </div>
        </div>
      </nav>
        <div className='top-bar'>
        <form>
          <SearchIcon className='search-icon'></SearchIcon>
        <input className='search search-icon'  type="text" id="search" name="search" placeholder="Search Anything"/>
       </form>
        </div>
      
    </div>
    <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
