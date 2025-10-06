import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Product from "./pages/Product";
import DetailProduct from "./pages/DetailProduct";
import CheckoutProduct from "./pages/CheckoutProduct";
import { HistoryOrder } from "./pages/HistoryOrder";
import { DetailOrder } from "./pages/DetailOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/detailproduct",
        element: <DetailProduct />,
      },
      {
        path: "/checkoutproduct",
        element: <CheckoutProduct />,
      },
      {
        path: "/HistoryOrder",
        element: <HistoryOrder />,
      },
      { path: "/DetailOrder/:orderNumber", element: <DetailOrder /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
