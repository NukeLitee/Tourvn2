// src/routes.js
import HomePage from "./pages/HomePage";
import ChotGapKeo from "./pages/ChotKeoHCM";
import DefaultLayout from "./components/layout/DefaultLayout";
import BookingPage from "./pages/BookingPage";
import Help from "./pages/Help";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
export const routes = [
  {
    path: "/",
    element: <HomePage />,
    layout: null,
  },
  {
    path: "/booking/:id",
    element: <BookingPage />,
    layout: null,
  },
  {
    path: "/help",
    element: <Help />,
    layout: null,
  },
  {
    path: "/cart",
    element: <CartPage />,
    layout: null,
  },
  {
    path: "/experience/:id",
    element: <ChotGapKeo />,
    layout: null,
  },
  {
    path: "/login",
    element: <LoginPage />,
    layout: null,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    layout: null,
  },
];
