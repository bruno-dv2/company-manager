import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Alert } from '@mui/material';
import { login, resetAuth } from '../store/auth/authSlice';
import useForm from '../hooks/useForm';
import { loginValidationRules } from '../utils/validation';
import {
  LoginContainer,
  ImageSide,
  BlueSection,
  PersonImage,
  GreenSection,
  HeadingText,
  SubText,
  FormSide,
  Logo,
  FormContainer,
  InputLabel,
  StyledTextField,
  PrimaryButton,
  SecondaryButton
} from '../styles/pages/Login.styles';

const Login = () => {
  const {
    values: formData,
    errors,
    touched,
    handleChange,
    validateForm
  } = useForm({
    email: '',
    senha: '',
  });
  
  const [formError, setFormError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario, token, isLoading, isSuccess, isError, mensagem } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (usuario && token) {
      navigate('/empresas');
    }
    
    if (isError) {
      setFormError(mensagem || 'Erro ao realizar login');
    }
    
    return () => {
      if (isSuccess || isError) {
        dispatch(resetAuth());
      }
    };
  }, [usuario, token, isSuccess, navigate, dispatch, isError, mensagem]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    
    if (validateForm(loginValidationRules)) {
      dispatch(login(formData));
    }
  };
  
  return (
    <LoginContainer>
      
      <ImageSide>
        <BlueSection>
          <PersonImage
            component="img"
            src="/images/7a17c78f8c0bc584cf510c4528f435bf987a42a6.png"
            alt="Pessoa com tablet"
          />
        </BlueSection>
        <GreenSection>
          <HeadingText>
            Junte-se a vários<br />
            clientes satisfeitos.
          </HeadingText>
          <SubText>
            Cliente HubLocal ganha mais relevância, autoridade e visibilidade. 
            Mais de 7.000 marcas confiam na nossa plataforma. Seja uma delas!
          </SubText>
        </GreenSection>
      </ImageSide>
      
      <FormSide>
        <FormContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Logo src="/images/5897cb0867784029e724327bcfe6d9c2b29ac72d.png" alt="HubLocal" />
          </Box>
          
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <InputLabel>
              Email
            </InputLabel>
            <StyledTextField
              name="email"
              variant="outlined"
              fullWidth
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            
            <InputLabel>
              Senha
            </InputLabel>
            <StyledTextField
              name="senha"
              type="password"
              variant="outlined"
              fullWidth
              placeholder="Digite sua senha"
              value={formData.senha}
              onChange={handleChange}
              required
              disabled={isLoading}
              error={touched.senha && Boolean(errors.senha)}
              helperText={touched.senha && errors.senha}
            />
            
            <PrimaryButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'CARREGANDO...' : 'LOGAR'}
            </PrimaryButton>
            
            <SecondaryButton
              variant="contained"
              fullWidth
              onClick={() => navigate('/cadastro')}
              disabled={isLoading}
            >
              CRIAR CONTA
            </SecondaryButton>
          </form>
        </FormContainer>
      </FormSide>
    </LoginContainer>
  );
};

export default React.memo(Login);