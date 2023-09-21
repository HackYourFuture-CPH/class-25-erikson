import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Password from "./pages/password/Password";
import Dashboard from "./pages/dashboard/Dashboard";
import "./App.css";


const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password" element={<Password />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </React.Fragment>
  )
);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
