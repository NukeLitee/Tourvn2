import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, layout: Layout }, index) => {
          const PageLayout = Layout || (({ children }) => <>{children}</>);
          return (
            <Route
              key={index}
              path={path}
              element={<PageLayout>{element}</PageLayout>}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
