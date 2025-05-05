import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
  Select,
  Box,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { toast } from 'react-toastify';

import { logout } from '../store/auth/authSlice';
import {
  listarEmpresas,
  criarEmpresa,
  atualizarEmpresa,
  removerEmpresa,
  selecionarEmpresa,
  resetEmpresa,
} from '../store/empresa/empresaSlice';

import { empresaValidationRules } from '../utils/validation';
import EmpresaForm from '../components/empresa/EmpresaForm';
import useForm from '../hooks/useForm';
import DeleteConfirmDialog from '../components/common/DeleteConfirmDialog';

import {
  PageContainer,
  HeaderContainer,
  TitleContainer,
  HeaderTitle,
  UserProfileContainer,
  UserAvatar,
  UserName,
  StyledMenu,
  StyledMenuItem,
  EmptyStateContainer,
  EmptyStateText,
  AddButton,
  LoadingContainer,
  StyledTableContainer,
  ActionButtonsContainer,
  ActionBar,
  PaginationContainer,
  PaginationText,
  PaginationBold,
  NavigationButton,
  AddButton2
} from '../styles/shared/SystemEstiloPadrao';

const initialFormState = {
  nome: '',
  website: '',
  cnpj: '',
};

const Empresas = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { empresas, isLoading } = useSelector((state) => state.empresa);
  const { usuario } = useSelector((state) => state.auth);

  const { values: formData, handleChange, resetForm, validateForm, errors, touched } = useForm(initialFormState);
  
  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);
  
  useEffect(() => {
    if (!usuario) {
      navigate('/login');
      return;
    }

    dispatch(listarEmpresas());

    return () => {
      dispatch(resetEmpresa());
    };
  }, [dispatch, navigate, usuario]);

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleCloseMenu();
  };

  const handleAbrirModalAdicionar = useCallback(() => {
    resetForm(initialFormState);
    setModalAdicionarAberto(true);
  }, [resetForm]);

  const handleFecharModalAdicionar = useCallback(() => {
    setModalAdicionarAberto(false);
  }, []);

  const handleAbrirModalEditar = useCallback((empresa) => {
    setEmpresaSelecionada(empresa);
    resetForm({
      nome: empresa.nome,
      website: empresa.website || '',
      cnpj: empresa.cnpj,
    });
    setModalEditarAberto(true);
  }, [resetForm]);

  const handleFecharModalEditar = useCallback(() => {
    setModalEditarAberto(false);
  }, []);

  const handleAbrirModalExcluir = useCallback((empresa) => {
    if (empresa && empresa.id) {
      setEmpresaSelecionada(empresa);
      setModalExcluirAberto(true);
    }
  }, []);

  const handleFecharModalExcluir = useCallback(() => {
    setModalExcluirAberto(false);
  }, []);

  const handleAdicionarEmpresa = useCallback(() => {
    if (validateForm(empresaValidationRules)) {
      dispatch(criarEmpresa(formData))
        .unwrap()
        .then(() => {
          setModalAdicionarAberto(false);
          toast.success('Empresa cadastrada com sucesso!', {
            style: { backgroundColor: '#00D084', color: 'white', fontWeight: 500 }
          });
        })
        .catch((error) => {
          toast.error(error || 'Erro ao cadastrar empresa', {
            style: { backgroundColor: '#FF0000', color: 'white', fontWeight: 500 }
          });
        });
    }
  }, [dispatch, formData, validateForm]);


  const handleEditarEmpresa = useCallback(() => {
    if (validateForm(empresaValidationRules) && empresaSelecionada) {
      dispatch(atualizarEmpresa({ id: empresaSelecionada.id, dadosEmpresa: formData }))
        .unwrap()
        .then(() => {
          setModalEditarAberto(false);
          toast.success('Empresa atualizada com sucesso!', {
            style: { backgroundColor: '#00D084', color: 'white', fontWeight: 500 }
          });
        })
        .catch((error) => {
          toast.error(error || 'Erro ao atualizar empresa', {
            style: { backgroundColor: '#FF0000', color: 'white', fontWeight: 500 }
          });
        });
    }
  }, [dispatch, empresaSelecionada, formData, validateForm]);


  const handleExcluirEmpresa = useCallback(() => {
    if (empresaSelecionada && empresaSelecionada.id) {
      dispatch(removerEmpresa(empresaSelecionada.id))
        .unwrap()
        .then(() => {
          setModalExcluirAberto(false);
          setEmpresaSelecionada(null);
          toast.success('Empresa removida com sucesso!', {
            style: { backgroundColor: '#00D084', color: 'white', fontWeight: 500 }
          });
        })
        .catch((error) => {
          toast.error(error || 'Erro ao remover empresa', {
            style: { backgroundColor: '#FF0000', color: 'white', fontWeight: 500 }
          });
        });
    }
  }, [dispatch, empresaSelecionada]);


  const handleVerLocais = useCallback((empresa) => {
    dispatch(selecionarEmpresa(empresa));
    navigate(`/empresas/${empresa.id}/locais`);
  }, [dispatch, navigate]);

  const handleChangePagina = (novaPagina) => {
    setPagina(novaPagina);
  };

  const handleChangeItensPorPagina = (event) => {
    setItensPorPagina(parseInt(event.target.value, 10));
    setPagina(1);
  };

  const userInitial = usuario?.nome ? usuario.nome.charAt(0).toUpperCase() : '';

  const itemsInicio = (pagina - 1) * itensPorPagina;
  const itemsFim = itemsInicio + itensPorPagina;
  const empresasPaginadas = empresas.slice(itemsInicio, itemsFim);

  return (
    <PageContainer>
      <HeaderContainer>
        <TitleContainer>
          <img 
            src="/images/mdi_company.png" 
            alt="Ícone de empresas" 
            style={{ width: '33px', height: '33px', top: '23px', left: '32px' }}
          />
          <HeaderTitle>Minhas Empresas</HeaderTitle>
        </TitleContainer>

        <UserProfileContainer onClick={handleOpenMenu}>
          <UserAvatar>{userInitial}</UserAvatar>
          <UserName>{usuario?.nome || 'Usuário'}</UserName>
          <KeyboardArrowDownIcon sx={{ ml: 5 }}/>
        </UserProfileContainer>

        <StyledMenu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleCloseMenu}
        >
          <StyledMenuItem onClick={handleLogout}>
            Sair
          </StyledMenuItem>
        </StyledMenu>
      </HeaderContainer>

      {empresas.length > 0 && (
        <ActionBar>
          <AddButton2 
            variant="contained" 
            onClick={handleAbrirModalAdicionar}
            aria-label="Adicionar nova empresa"
          >
            Adicionar Empresa
          </AddButton2>
        </ActionBar>
      )}

      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : empresas.length === 0 ? (
        <EmptyStateContainer>
          <EmptyStateText>
            Nenhuma empresa <br/> cadastrada!
          </EmptyStateText>
          <AddButton
            variant="contained"
            onClick={handleAbrirModalAdicionar}
            aria-label="Adicionar empresa"
          >
            Adicionar Empresa
          </AddButton>
        </EmptyStateContainer>
      ) : (
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Empresa</strong></TableCell>
                <TableCell align="center"><strong>Qt de Locais</strong></TableCell>
                <TableCell align="center"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empresasPaginadas.map((empresa) => (
                <TableRow key={empresa.id}>
                  <TableCell>{empresa.nome}</TableCell>
                  <TableCell align="center">{empresa.qtDeLocais || 0}</TableCell>
                  <TableCell align="center">
                    <ActionButtonsContainer>
                      <IconButton 
                        color="primary" 
                        onClick={() => handleAbrirModalEditar(empresa)}
                        aria-label={`Editar empresa ${empresa.nome}`}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        color="primary" 
                        onClick={() => handleVerLocais(empresa)}
                        aria-label={`Ver locais da empresa ${empresa.nome}`}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        onClick={() => handleAbrirModalExcluir(empresa)}
                        aria-label={`Excluir empresa ${empresa.nome}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ActionButtonsContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {empresas.length > 0 && (
            <PaginationContainer>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PaginationText>Página:</PaginationText>
                <PaginationBold>{pagina}</PaginationBold>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PaginationText>Qt por página:</PaginationText>
                <Select
                  value={itensPorPagina}
                  onChange={handleChangeItensPorPagina}
                  displayEmpty
                  size="small"
                  sx={{ 
                    height: '32px', 
                    minWidth: '70px',
                    fontSize: '14px',
                    '.MuiSelect-select': {
                      padding: '4px 8px',
                    }
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </Box>
              
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <NavigationButton
                  disabled={pagina === 1}
                  active={false}
                  onClick={() => handleChangePagina(pagina - 1)}
                >
                  Anterior
                </NavigationButton>
                <NavigationButton
                  active={true}
                  onClick={() => handleChangePagina(pagina + 1)}
                  disabled={itemsFim >= empresas.length}
                >
                  Próxima
                </NavigationButton>
              </Box>
            </PaginationContainer>
          )}
        </StyledTableContainer>
      )}

      <EmpresaForm
        open={modalAdicionarAberto}
        title="Adicionar empresa"
        formData={formData}
        handleChange={handleChange}
        onSubmit={handleAdicionarEmpresa}
        onCancel={handleFecharModalAdicionar}
        submitLabel="Adicionar"
        isLoading={isLoading}
        errors={errors}
        touched={touched}
      />

      <EmpresaForm
        open={modalEditarAberto}
        title={`Editar: ${empresaSelecionada?.nome || ''}`}
        formData={formData}
        handleChange={handleChange}
        onSubmit={handleEditarEmpresa}
        onCancel={handleFecharModalEditar}
        submitLabel="Salvar"
        isLoading={isLoading}
        errors={errors}
        touched={touched}
      />

      {empresaSelecionada && (
        <DeleteConfirmDialog
          open={modalExcluirAberto}
          title="Confirmação de exclusão"
          itemName={empresaSelecionada.nome}
          itemType="empresa"
          onConfirm={handleExcluirEmpresa}
          onCancel={handleFecharModalExcluir}   
        />
      )}
    </PageContainer>
  );
};

export default Empresas;