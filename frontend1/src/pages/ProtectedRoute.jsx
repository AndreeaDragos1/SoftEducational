import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Dacă utilizatorul nu este autentificat, redirecționează-l la pagina de login
    return <Navigate to="/login" />;
  }

  // Dacă este autentificat, permite accesul la pagină
  return children;
};

export default ProtectedRoute;
