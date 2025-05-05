import { styled } from '@mui/material/styles';
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Button,
  TextField,
  Typography
} from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '684px',
    maxWidth: '100%',
    borderRadius: '6px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
}));

export const StyledDialogTitle = styled(Box)(({ theme }) => ({
  backgroundColor: '#0096FF',
  color: 'white',
  padding: '12px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: '"Poppins", sans-serif',
}));

export const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: '25px',
  fontWeight: 700,
  fontFamily: '"Poppins", sans-serif',
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  padding: 0,
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: '26px 24px 0px 24px',
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: '16px 24px',
  height: '80px',
  borderTop: '1px solid #e0e0e0',
  justifyContent: 'flex-end',
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0385FD',
  color: 'white',
  width: '147px',
  height: '45px',
  textTransform: 'none',
  borderRadius: '4px',
  padding: '8px 24px',
  fontWeight: 600,
  fontSize: '20px',
  '&:hover': {
    backgroundColor: '#0078cc',
  },
  boxShadow: 'none',
}));

export const FieldLabel = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  marginBottom: '8px',
  color: '#333',
  fontFamily: '"Poppins", sans-serif',
}));

export const FieldContainer = styled(Box)(({ theme }) => ({
  marginBottom: '16px',
}));

export const RowContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  '& > *': {
    flex: 1,
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#0096FF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0096FF',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px',
    fontFamily: '"Poppins", sans-serif',
  },
}));