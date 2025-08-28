import { useAuth } from '@/provider/auth-context';
import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router'

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, [isLoading]);
  return <Outlet />;
}
  export default AuthLayout;
