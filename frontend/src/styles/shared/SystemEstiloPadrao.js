import { styled } from '@mui/material/styles';
import { 
  Box,
  Button,
  Avatar,
  DialogTitle,
  Typography,
  Menu,
  MenuItem
} from '@mui/material';


export const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '44px',
  height: '80px',
  backgroundColor: 'white',
  borderBottom: '1px solid #e0e0e0',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '16px',
    height: '70px',
  },
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '30px',
  fontWeight: 700,
  fontFamily: '"Poppins", "Inter", sans-serif',
  color: '#000',
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
  },
}));

export const UserProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: '80px',
  backgroundColor: '#EAEAEA',
  cursor: 'pointer',
  paddingLeft: '25px',
  paddingRight: '25px',
  borderBottom: '1px solid #e0e0e0',
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: '#00D084',
  width: '54px',
  height: '54px'
}));

export const UserName = styled(Typography)(({ theme }) => ({
  marginLeft: '12px',
  top: '30px',
  fontWeight: 600,
  fontSize: '20px',
  fontFamily: '"Poppins", "Inter", sans-serif',
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: '1px',
    borderRadius: '5px',
    minWidth: '100px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
  },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: '"Poppins", "Inter", sans-serif',
  fontSize: '16px',
  padding: '10px 30px',
}));

export const BreadcrumbContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
  paddingLeft: '44px',
  marginTop: '16px',
}));

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

export const EmptyStateText = styled(Typography)(({ theme }) => ({
  fontSize: '60px',
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  color: '#000',
  textAlign: 'center',
  fontFamily: '"Poppins", "Inter", sans-serif',
}));

export const ActionBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '16px',
  marginTop: '26px',
  padding: '0 44px',
}));

export const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0096FF',
  color: 'white',
  textTransform: 'none',
  borderRadius: '5px',
  padding: '10px 48px',
  fontWeight: 600,
  fontSize: '25px',
  '&:hover': {
    backgroundColor: '#0365EE',
  },
  boxShadow: 'none',
  fontFamily: '"Poppins", "Inter", sans-serif',
}));

export const AddButton2 = styled(Button)(({ theme }) => ({
  backgroundColor: '#0096FF',
  color: 'white',
  borderRadius: '5px',
  padding: '8px 30px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '20px',
  minWidth: '254px',
  height: '45px',
  '&:hover': {
    backgroundColor: '#0078cc',
  },
  boxShadow: 'none',
  fontFamily: '"Poppins", "Inter", sans-serif',
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '16px 24px',
  backgroundColor: 'white',
  gap: '16px',
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px'
}));

export const PaginationText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#000000',
  fontWeight: 600,
}));

export const PaginationBold = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: '#000000',
}));

export const NavigationButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  backgroundColor: active ? '#0096FF' : '#f0f0f0',
  color: active ? 'white' : '#333',
  fontSize: '14px',
  textTransform: 'none',
  padding: '4px 12px',
  '&:hover': {
    backgroundColor: active ? '#0078cc' : '#e0e0e0',
  },
  '&.Mui-disabled': {
    color: '#aaa',
  }
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  width: '100%',
}));

export const StyledTableContainer = styled(Box)(({ theme }) => ({
  margin: '10px 44px',
  backgroundColor: 'white',
  borderRadius: '8px',
}));

export const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
}));

export const ErrorDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: 'white',
  fontWeight: 600,
}));