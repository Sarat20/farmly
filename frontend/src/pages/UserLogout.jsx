import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {

  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-600">Logging out...</div>
  );
};

export default UserLogout;
