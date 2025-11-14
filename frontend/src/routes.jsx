// src/routes.js
import HomePage from "./pages/HomePage";
import ChotGapKeo from "./pages/ChotKeoHCM";
import DefaultLayout from "./components/layout/DefaultLayout";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    layout: null,
  },
  {
    path: "/Chotgapkeo",
    element: <ChotGapKeo/>,
    layout: null,
  }
];
