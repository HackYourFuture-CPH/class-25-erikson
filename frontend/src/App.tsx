import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Password from './pages/password/Password';
import Dashboard from './pages/dashboard/Dashboard';
import './App.css';

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/dashboard' replace />,
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
      path: '/dashboard',
      element: <Dashboard />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
