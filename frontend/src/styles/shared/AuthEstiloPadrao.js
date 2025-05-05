import { styled } from '@mui/material/styles';
import { Box, Typography, TextField, Button } from '@mui/material';

export const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  overflow: 'hidden'
}));

export const ImageSide = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'stretch',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const BlueSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#0096FF',
  width: '100%',
  flex: 1,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  padding: theme.spacing(2),
  paddingBottom: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',
}));

export const PersonImage = styled(Box)(({ theme }) => ({
  maxHeight: '100%',
  maxWidth: '100%',
  objectFit: 'contain',
  marginBottom: '-20px'
}));

export const GreenSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#00D084',
  width: '100%',
  padding: theme.spacing(6, 4, 5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  position: 'relative',
}));

export const HeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2.5rem',
  lineHeight: '1.2',
  color: 'white',
  marginBottom: theme.spacing(1),
  textAlign: 'center',
}));

export const SubText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: 'white',
  maxWidth: 400,
  textAlign: 'center',
  lineHeight: '1.5',
}));

export const FormSide = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: 'white'
}));

export const Logo = styled('img')(({ theme }) => ({
  width: 240,
  marginBottom: theme.spacing(6),
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 450,
  padding: theme.spacing(2),
}));

export const InputLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1rem',
  color: '#333333',
  marginBottom: theme.spacing(1),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    height: 55,
    '& fieldset': {
      borderColor: '#E0E0E0',
      borderWidth: 1
    },
    '&:hover fieldset': {
      borderColor: '#0096FF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0096FF',
    },
    '&.Mui-error fieldset': {
      borderColor: theme.palette.error.main,
    }
  },
  '& .MuiInputBase-input': {
    fontSize: '1rem',
    padding: theme.spacing(2),
  },
  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    fontSize: '0.75rem',
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: theme.palette.error.main,
  }
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  height: 55,
  borderRadius: 8,
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: '1rem',
  backgroundColor: '#0096FF',
  color: 'white',
  '&:hover': {
    backgroundColor: '#007cd9',
  }
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  height: 55,
  borderRadius: 8,
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: '1rem',
  backgroundColor: '#00D084',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00b873',
  }
}));