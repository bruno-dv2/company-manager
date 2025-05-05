import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import { cadastrar, resetAuth } from '../store/auth/authSlice';

import {
  CadastroContainer,
  PersonImage,
  ImageSide,
  BlueSection,
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
} from '../styles/pages/Cadastro.styles';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    repetirSenha: '',
  });
  
  const [formError, setFormError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario, isLoading, isSuccess, isError, mensagem } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isSuccess && usuario) {
      navigate('/empresas');
    }
    
    if (isError) {
      setFormError(mensagem || 'Erro ao cadastrar usuário');
    }
    
    return () => {
      dispatch(resetAuth());
    };
  }, [usuario, isSuccess, isError, mensagem, navigate, dispatch]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!formData.nome || !formData.email || !formData.senha || !formData.repetirSenha) {
      setFormError('Todos os campos são obrigatórios');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Email inválido');
      return;
    }
    
    if (formData.senha !== formData.repetirSenha) {
      setFormError('As senhas não coincidem');
      return;
    }
    
    if (formData.senha.length < 6) {
      setFormError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    dispatch(cadastrar({ 
      nome: formData.nome, 
      email: formData.email, 
      senha: formData.senha 
    }));
  };
  
  return (
    <CadastroContainer>
      
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
            <InputLabel component={Typography} variant="body1" fontWeight={500}>
              Nome
            </InputLabel>
            <StyledTextField
              name="nome"
              variant="outlined"
              fullWidth
              placeholder="Digite seu nome completo"
              value={formData.nome}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            
            <InputLabel component={Typography} variant="body1" fontWeight={500}>
              Email
            </InputLabel>
            <StyledTextField
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            
            <InputLabel component={Typography} variant="body1" fontWeight={500}>
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
            />

            <InputLabel component={Typography} variant="body1" fontWeight={500}>
              Repetir Senha
            </InputLabel>
            <StyledTextField
              name="repetirSenha"
              type="password"
              variant="outlined"
              fullWidth
              placeholder="Repita sua senha"
              value={formData.repetirSenha}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            
            <PrimaryButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'PROCESSANDO...' : 'REGISTRAR'}
            </PrimaryButton>
            
            <SecondaryButton
              variant="contained"
              fullWidth
              onClick={() => navigate('/login')}
              disabled={isLoading}
            >
              LOGAR
            </SecondaryButton>
          </form>
        </FormContainer>
      </FormSide>
    </CadastroContainer>
  );
};

export default Cadastro;