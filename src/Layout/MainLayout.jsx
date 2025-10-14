import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();

  const hideFooterOn = [
    "/dashboard",
    "/productdashboard",
    "/orderdashboard",
    "/UsersDashboard",
  ];

  const shouldHideFooter = hideFooterOn.some((path) =>
    location.pathname.toLowerCase().startsWith(path.toLocaleLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>

      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
