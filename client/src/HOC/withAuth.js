import React from 'react';
import { Navigate } from 'react-router-dom';

function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const user = localStorage.getItem('user');

    if (!user) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
}

export default withAuth;