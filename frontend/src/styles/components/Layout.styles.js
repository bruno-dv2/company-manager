import { styled } from '@mui/material/styles';
import { AppBar, Container, Box } from '@mui/material';

export const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0',
}));

export const MainContainer = styled(Container)(({ theme }) => ({
  padding: 0,
  maxWidth: '100%',
  margin: 0,
}));

export const UserInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const UserAvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}));