import { useContext } from "react"
import {AuthContext} from "../context/AuthContext" 
import { Navigate,Outlet } from "react-router-dom";



const PrivateRoute = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthContext must be used within AuthProvider');

  const { isAuthenticated, isLoading } = context;

  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;