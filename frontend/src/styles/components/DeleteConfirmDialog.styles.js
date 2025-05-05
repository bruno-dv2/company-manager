import { styled } from '@mui/material/styles';
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Button,
  Typography
} from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '684px',
    height: '307px',
    maxWidth: '100%',
    margin: 0,
    borderRadius: '6px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
}));

export const StyledDialogTitle = styled(Box)(({ theme }) => ({
  backgroundColor: '#C90808',
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

export const MessageText = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontFamily: '"Poppins", sans-serif',
  lineHeight: 1.5,
  color: '#333333',
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: '16px 24px',
  height: '80px',
  borderTop: '1px solid #e0e0e0',
  justifyContent: 'flex-end',
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#C90808',
  color: 'white',
  width: '147px',
  height: '45px',
  textTransform: 'none',
  borderRadius: '4px',
  padding: '8px 24px',
  fontWeight: 600,
  fontSize: '20px',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
  boxShadow: 'none',
}));