import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Password from './pages/password/Password';
import Dashboard from './pages/dashboard/Dashboard';
import CourseDetails from './pages/course/CourseDetails';
import AddCourseForm from './pages/form/AddCourseForm';
import './App.css';
import Notification from './components/notification/Notification.component';
import useNotificationStore from './store/notification.store';
import UnderConstruction from './pages/underConstruction/underConstruction';

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
      element: <Dashboard />,
    },
    {
      path: '/add-course',
      element: <AddCourseForm />,
    },
    {
      path: '/course/:id',
      element: <CourseDetails />,
    },

    {
      path: '/underconstruction',
      element: <UnderConstruction />,
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
