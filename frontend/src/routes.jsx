// src/routes.js
import HomePage from "./pages/HomePage";
import DefaultLayout from "./components/layout/DefaultLayout";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    layout: null,
  },
];
