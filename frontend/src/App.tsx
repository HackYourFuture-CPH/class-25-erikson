import { ReactNode } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Password from './pages/password/Password';
import Dashboard from './pages/dashboard/Dashboard';
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';

function App(): JSX.Element {
  const { user } = useAuthContext();

  const renderPage = (authenticated: ReactNode, notAuthenticated: ReactNode): ReactNode => {
    return user?.emailVerified ? authenticated : notAuthenticated;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: renderPage(<Navigate to='/dashboard' replace />, <Navigate to='/login' replace />),
    },
    {
      path: '/signup',
      element: renderPage(<Navigate to='/dashboard' replace />, <Signup />),
    },
    {
      path: '/login',
      element: renderPage(<Navigate to='/dashboard' replace />, <Login />),
    },
    {
      path: '/password',
      element: renderPage(<Navigate to='/dashboard' replace />, <Password />),
    },
    {
      path: '/dashboard',
      element: renderPage(<Dashboard />, <Navigate to='/login' replace />),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
