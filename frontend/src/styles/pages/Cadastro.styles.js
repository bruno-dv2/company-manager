import {
  ImageSide,
  BlueSection,
  PersonImage,
  GreenSection,
  HeadingText,
  SubText,
  FormSide,
  FormContainer,
  Logo,
  InputLabel,
  StyledTextField,
  PrimaryButton,
  SecondaryButton
} from '../shared/AuthEstiloPadrao';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const CadastroContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  overflow: 'hidden'
}));

export {
  ImageSide,
  BlueSection,
  PersonImage,
  GreenSection,
  HeadingText,
  SubText,
  FormSide,
  FormContainer,
  Logo,
  InputLabel,
  StyledTextField,
  PrimaryButton,
  SecondaryButton
};