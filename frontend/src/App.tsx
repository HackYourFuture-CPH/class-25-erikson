import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Password from "./pages/password/Password";
import Dashboard from "./pages/dashboard/Dashboard";
import "./App.css";
import CourseDetails from "./pages/course/CourseDetails";

function App(): JSX.Element {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/courses" replace />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/password",
      element: <Password />
    },
    {
      path: "/courses",
      element: <Dashboard />
    },
    {
      path: "/course/:id",
      element: <CourseDetails />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
