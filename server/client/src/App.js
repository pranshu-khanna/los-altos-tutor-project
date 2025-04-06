import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import NavBar from "./components/navBar/NavBar.jsx";
import LeftBar from "./components/leftBar/LeftBar.jsx";
import Calendar from "./pages/calendar/Calendar.jsx";
import StudentSettings from "./pages/student/settings/Settings.jsx";
import TutorSettings from "./pages/tutor/settings/Settings.jsx";
import StudentClasses from "./pages/student/classes/Classes.jsx";
import TutorClasses from "./pages/tutor/classes/Classes.jsx";
import LaunchClass from "./pages/tutor/launch/Launch.jsx";
import ClassDetails from "./pages/tutor/class/ClassDetails.jsx";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import React from "react";
import "./style.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import {useContext} from "react";
import {DarkModeContext} from "./context/darkModeContext.js";
import {AuthContext} from "./context/authContext.js";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App() {
  const {currentUser} = useContext(AuthContext);
  const {darkMode} = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar/>
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          <LeftBar />
        <div style={{ flex: 6, height: "100%", overflowY: "auto" }}>
          <Outlet />
        </div>
</div>
      </div>
      </QueryClientProvider>
    );
  }

  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to ="/login"/>
    };

    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout/></ProtectedRoute>,
      children: [
          {
            path: "/",
            element: <Home/>
          },
          {
            path: "/calendar",
            element: <Calendar/>
          },
          {
            path: "/settings",
            element: <StudentSettings/>
          },
          {
            path: "/profile/:id",
            element: <Profile/>
          },
          {
            path: "/classes",
            element: <TutorClasses/>
          },
          {
            path: "/launch",
            element: <LaunchClass/>
          },
          {
            path: "/class:classId",
            element: <ClassDetails/>
          }
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    }
  ]);

  return (
    <div>
      <RouterProvider router = {router}/>
    </div>
  );
};

export default App;
