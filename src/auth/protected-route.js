import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, redirectTo }) {
    let {isAuthenticated, isLoading} = useAuth0();
    if (isLoading) {
      return <div>Loading ...</div>;
    }
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

export default ProtectedRoute;