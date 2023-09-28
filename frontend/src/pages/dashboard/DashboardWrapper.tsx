import { ReactNode , useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Dashboard.css';

type FormWrapperProps = {
   children: ReactNode;
};
const DashboardWrapper = ({ children }: FormWrapperProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
  return (
    <>
     <div className='dashboard-layout'>
      <nav className='sidebar'>
       <div className='dashboard-logo'>
        <img src="images/dashboard.svg" alt="dashboard" />
       </div>

        <div className='sidebar-menu'>
         <div className='sidebar-item'>
         <a href="#">
         <img src="images/dashboard2.svg" alt="dashboard2" />
         <p>Dashboard</p>
        </a>
       
         </div>

         <div className='sidebar-item'>
         <a href="#">
        <img src="images/goals.svg" alt="dashboard2" />
        <p>Goals</p>
        </a>
       
         </div>
       

         <div className='sidebar-item'>
         <a href="#"> 
        <img src="images/video.svg" alt="live schedule" />
        <p>Live Schedule</p>
        </a>
        
         </div>

         <div className='sidebar-item'>

         <a href="#">
        <img src="images/calendar.svg" alt="class schedule" />
        <p>Class Schedule</p>
        </a>
       
         </div>

         <div className='sidebar-item'>
         <a href="#">
        <img src="images/bookmark.svg" alt="course" />
        <p>Course</p>
        </a>
        
         </div>

         <div className='sidebar-item'>
         <a href="#">
        <img src="images/document.svg" alt="resources" />
       
         <p>Resources</p>
         </a>
         </div>

         <div className='sidebar-item'>
         <a href="#">
        <img src="images/folder.svg" alt="directory" />
        <p>Directory</p>
        </a>
         </div>
        </div>
      </nav>


        <div className='main'>

        <div className='top-bar'>
        <form>
        <input className='search'  type="text" id="search" name="search" placeholder="Search Anything"/>
       </form>


       <div className='user'>
         <img  className='user-img'src='https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80'/>
         <p onClick={toggleDropdown}>user name</p>
         <span className="down-arrow">{isDropdownOpen ? '▲' : '▼'}</span>
         {isDropdownOpen && (
             <div className="dropdown-menu">
               <p>Log out</p>
             </div>
           )}
         
       </div>
        </div>


        <div className='create-course-wrapper'>
            <div className='create-course'>
           <h2>Course</h2>
           <button className='create-course-btn'>Create New Course+</button>
        </div>
        </div>
         <div> {children}</div>
        </div>
    </div>
   
    </>
  );
};
export default DashboardWrapper;