import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { MainContainer } from '../../styles/components/Layout.styles';

const Layout = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <MainContainer>
        {children}
      </MainContainer>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;