// src/routes.js
import HomePage from "./pages/HomePage";
import DefaultLayout from "./components/layout/DefaultLayout";
import BookingPage from "./pages/BookingPage";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    layout: null,
  },
  {
    path:'/DatTour',
    element: <BookingPage/>,
    layout: null,
  },
];
