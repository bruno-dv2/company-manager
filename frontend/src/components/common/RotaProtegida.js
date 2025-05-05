import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RotaProtegida = ({ children }) => {
  const { usuario, token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!usuario || !token) {
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
};

RotaProtegida.propTypes = {
  children: PropTypes.node.isRequired
};

export default RotaProtegida;