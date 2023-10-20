import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import useNotificationStore from './store/notification.store';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Password from './pages/password/Password';
import Dashboard from './pages/dashboard/Dashboard';
import CourseDetails from './pages/course/CourseDetails';
import AddCourseForm from './pages/form/AddCourseForm';
import Notification from './components/notification/Notification.component';
import MyCourses from './pages/myCourses/MyCourses';
import UnderConstruction from './pages/underConstruction/underConstruction';
import './App.css';
import DashboardWrapper from './components/dashboardLayout/DashboardWrapper';
import Lessons from './pages/lessons/Lessons.component';

function App(): JSX.Element {
  const { notification } = useNotificationStore();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/courses' replace />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/password',
      element: <Password />,
    },
    {
      path: '/courses',
      element: (
        <DashboardWrapper>
          <Dashboard />
        </DashboardWrapper>
      ),
    },
    {
      path: '/add-course',
      element: (
        <DashboardWrapper>
          <AddCourseForm />
        </DashboardWrapper>
      ),
    },
    {
      path: '/course/:id',
      element: (
        <DashboardWrapper>
          <CourseDetails />
        </DashboardWrapper>
      ),
    },
    {
      path: '/course/:id/lessons',
      element: (
        <DashboardWrapper>
          <Lessons />
        </DashboardWrapper>
      ),
    },
    {
      path: '/my-courses',
      element: (
        <DashboardWrapper>
          <MyCourses />
        </DashboardWrapper>
      ),
    },
    {
      path: '/underconstruction',
      element: (
        <DashboardWrapper>
          <UnderConstruction />
        </DashboardWrapper>
      ),
    },
  ]);

  return (
    <>
      {notification && (
        <Notification message={notification.message} severity={notification?.severity} />
      )}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
