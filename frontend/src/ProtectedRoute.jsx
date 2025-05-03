import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import API from './services/api';

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get('/auth/getuser');
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
