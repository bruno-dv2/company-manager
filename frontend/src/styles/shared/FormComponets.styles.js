import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
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
    '&.Mui-error fieldset': {
      borderColor: theme.palette.error.main,
    }
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px',
    fontFamily: '"Poppins", sans-serif',
  },
  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    fontSize: '0.75rem',
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: theme.palette.error.main,
  }
}));