import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VendorLogout = () => {

  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem('vtoken');
    navigate('/vendor');
  }, [navigate]);

  return (
    <div>Logging out...</div>
  );
};

export default VendorLogout;
