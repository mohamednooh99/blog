import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

function Layout() {
  // const location = useLocation();
  // const isLoginOrSignupPage =
  //   location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
