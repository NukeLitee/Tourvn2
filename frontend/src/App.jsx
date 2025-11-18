import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes.jsx";
import { CartProvider } from "./context/CartContext.jsx";
// Import AuthProvider
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    // Bọc AuthProvider ở ngoài cùng (hoặc trong Router, tùy ý, miễn là bọc các Routes)
    <AuthProvider>
      <CartProvider>
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
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
