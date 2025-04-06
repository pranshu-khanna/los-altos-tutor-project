import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import NavBar from "./components/navBar/NavBar.jsx";
import LeftBar from "./components/leftBar/LeftBar.jsx";
import Calendar from "./pages/calendar/Calendar.jsx";
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
  // const {currentUser} = useContext(AuthContext);
  // const {currentUser} = useContext(true);
  const {darkMode} = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar/>
        <div style={{display: "flex"}}>
          <LeftBar/>
          <div style = {{flex:6}}>
            <Outlet/>
          </div>
        </div>
      </div>
      </QueryClientProvider>
    );
  }

  const ProtectedRoute = ({children}) => {
    /*
    if (!currentUser) {
      return <Navigate to ="/login"/>
    };
    */

    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout/></ProtectedRoute>,
      children: [
          {
            path: "/calendar",
            element: <Calendar/>
          },
          {
            path: "/profile/:id",
            element: <Profile/>
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
