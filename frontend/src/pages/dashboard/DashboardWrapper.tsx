import { ReactNode } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Dashboard.css';
type FormWrapperProps = {
   children: ReactNode;
};
const DashboardWrapper = ({ children }: FormWrapperProps) => {
  return (
    <>
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
        <div className='main'>
        <div className='top-bar'>
        <form>
        <SearchIcon className='search-icon'></SearchIcon>
        <input className='search'  type="text" id="search" name="search" placeholder="Search Anything"/>
       </form>
       <div className='user'>
         <img  className='user-img'src='https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80'/>
         <p>user name</p>
       </div>
        </div>
        </div>
    </div>
    <button >Logout</button>
    {children}
       
    </>
  );
};
export default DashboardWrapper;