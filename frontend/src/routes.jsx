// src/routes.js
import HomePage from "./pages/HomePage";
import DefaultLayout from "./components/layout/DefaultLayout";
import BookingPage from "./pages/BookingPage";
import Help from "./pages/Help";
import Cart from "./pages/Cart";
export const routes = [
  {
    path: "/",
    element: <HomePage />,
    layout: null,
  },
  {
    path: "/DatTour",
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
    element: <Cart />,
    layout: null,
  },
];
