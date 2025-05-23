import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {

  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  return (
    <div>Logging out...</div>
  );
};

export default UserLogout;
