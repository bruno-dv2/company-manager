import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
  Box,
  Select,
  MenuItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { toast } from 'react-toastify';

import { logout } from '../store/auth/authSlice';
import {
  listarLocaisPorEmpresa,
  criarLocal,
  atualizarLocal,
  removerLocal,
  resetLocal,
  selecionarLocal,
  limparLocalSelecionado
} from '../store/local/localSlice';

import { localValidationRules } from '../utils/validation';
import LocalForm from '../components/local/LocalForm';
import DeleteConfirmDialog from '../components/common/DeleteConfirmDialog';
import useForm from '../hooks/useForm';

import {
  BreadcrumbContainer,
  LoadingContainer,
  EmptyStateContainer,
  EmptyStateText,
  AddButton,
  StyledTableContainer,
  PageContainer,
  HeaderContainer,
  TitleContainer,
  HeaderTitle,
  UserProfileContainer,
  UserAvatar,
  UserName,
  StyledMenu,
  StyledMenuItem,
  AddButton2,
  ActionBar,
  ActionButtonsContainer,
  PaginationContainer,
  PaginationText,
  PaginationBold,
  NavigationButton
} from '../styles/shared/SystemEstiloPadrao';

const initialFormState = {
  nome: '',
  cep: '',
  rua: '',
  numero: '',
  bairro: '',
  cidade: '',
  estado: '',
};

const Locais = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: empresaId } = useParams();
  const { locais, isLoading, localSelecionado } = useSelector((state) => state.local);
  const { empresaSelecionada } = useSelector((state) => state.empresa);
  const { usuario } = useSelector((state) => state.auth);

  const { values: formData, handleChange, resetForm, validateForm, errors, touched } = useForm(initialFormState);
  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  useEffect(() => {
    if (!usuario) {
      navigate('/login');
      return;
    }

    if (!empresaSelecionada && empresaId) {
      navigate('/empresas');
      return;
    }

    dispatch(listarLocaisPorEmpresa(Number(empresaId)));

    return () => {
      dispatch(resetLocal());
      dispatch(limparLocalSelecionado());
    };
  }, [dispatch, navigate, usuario, empresaSelecionada, empresaId]);

  const handleAbrirModalAdicionar = useCallback(() => {
    resetForm(initialFormState);
    setModalAdicionarAberto(true);
  }, [resetForm]);

  const handleFecharModalAdicionar = useCallback(() => {
    setModalAdicionarAberto(false);
  }, []);

  const handleAbrirModalEditar = useCallback((local) => {
    dispatch(selecionarLocal(local));
    resetForm({
      nome: local.nome,
      cep: local.cep,
      rua: local.rua,
      numero: local.numero,
      bairro: local.bairro,
      cidade: local.cidade,
      estado: local.estado,
    });
    setModalEditarAberto(true);
  }, [dispatch, resetForm]);

  const handleFecharModalEditar = useCallback(() => {
    setModalEditarAberto(false);
  }, []);

  const handleAbrirModalExcluir = useCallback((local) => {
    if (local && local.id) {
      dispatch(selecionarLocal(local));
      setModalExcluirAberto(true);
    }
  }, [dispatch]);

  const handleFecharModalExcluir = useCallback(() => {
    setModalExcluirAberto(false);
  }, []);

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleCloseMenu();
  };

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleAdicionarLocal = useCallback(() => {
    if (validateForm(localValidationRules)) {
      const dadosLocal = {
        ...formData,
        empresaId: Number(empresaId),
      };
      dispatch(criarLocal(dadosLocal))
        .unwrap()
        .then(() => {
          setModalAdicionarAberto(false);
          toast.success('Local cadastrado com sucesso!', {
            style: { backgroundColor: '#00D084', color: 'white', fontWeight: 500 }
          });
        })
        .catch((error) => {
          toast.error(error || 'Erro ao cadastrar local', {
            style: { backgroundColor: '#FF0000', color: 'white', fontWeight: 500 }
          });
        });
    }
  }, [dispatch, formData, empresaId, validateForm]);

  const handleEditarLocal = useCallback(() => {
    if (validateForm(localValidationRules) && localSelecionado) {
      dispatch(atualizarLocal({ id: localSelecionado.id, dadosLocal: formData }))
        .unwrap()
        .then(() => {
          setModalEditarAberto(false);
          toast.success('Local atualizado com sucesso!', {
            style: { backgroundColor: '#00D084', color: 'white', fontWeight: 500 }
          });
        })
        .catch((error) => {
          toast.error(error || 'Erro ao atualizar local', {
            style: { backgroundColor: '#FF0000', color: 'white', fontWeight: 500 }
          });
        });
    }
  }, [dispatch, localSelecionado, formData, validateForm]);

  const handleExcluirLocal = useCallback(() => {
    if (localSelecionado && localSelecionado.id) {
      dispatch(removerLocal(localSelecionado.id))
        .unwrap()
        .then(() => {
          setModalExcluirAberto(false);
          toast.success('Local removido com sucesso!', {
            style: { backgroundColor: '#00D084', color: 'white', fontWeight: 500 }
          });
        })
        .catch((error) => {
          toast.error(error || 'Erro ao remover local', {
            style: { backgroundColor: '#FF0000', color: 'white', fontWeight: 500 }
          });
        });
    }
  }, [dispatch, localSelecionado]);

  const voltarParaEmpresas = useCallback(() => {
    navigate('/empresas');
  }, [navigate]);

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
  const locaisPaginados = locais.slice(itemsInicio, itemsFim);

  return (
    <PageContainer>
      <HeaderContainer>
        <TitleContainer>
          <img 
            src="/images/mdi_company.png" 
            alt="Ícone de empresas" 
            style={{ width: '33px', height: '33px', top: '23px', left: '32px' }}
          />
          <HeaderTitle>Empresa {empresaSelecionada?.nome}</HeaderTitle>
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

      <BreadcrumbContainer>
        <IconButton 
          onClick={voltarParaEmpresas} 
          aria-label="Voltar para empresas"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body2">Minhas Empresas</Typography>
      </BreadcrumbContainer>

      {locais.length > 0 && (
        <ActionBar>
          <AddButton2 
            variant="contained" 
            onClick={handleAbrirModalAdicionar}
            aria-label="Adicionar novo local"
          >
            Adicionar Local
          </AddButton2>
        </ActionBar>
      )}

      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : locais.length === 0 ? (
        <EmptyStateContainer>
          <EmptyStateText>
            Nenhum local <br/> cadastrado!
          </EmptyStateText>
          <AddButton
            variant="contained"
            onClick={handleAbrirModalAdicionar}
            aria-label="Adicionar local"
          >
            Adicionar Local
          </AddButton>
        </EmptyStateContainer>
      ) : (
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Local</strong></TableCell>
                <TableCell align="center"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locaisPaginados.map((local) => (
                <TableRow key={local.id}>
                  <TableCell>{local.nome}</TableCell>
                  <TableCell align="center">
                    <ActionButtonsContainer>
                      <IconButton 
                        color="primary" 
                        onClick={() => handleAbrirModalEditar(local)}
                        aria-label={`Editar local ${local.nome}`}
                      >
                        <EditIcon />
                        </IconButton>
                      <IconButton 
                        color="error" 
                        onClick={() => handleAbrirModalExcluir(local)}
                        aria-label={`Excluir local ${local.nome}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ActionButtonsContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {locais.length > 0 && (
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
                  disabled={itemsFim >= locais.length}
                >
                  Próxima
                </NavigationButton>
              </Box>
            </PaginationContainer>
          )}
        </StyledTableContainer>
      )}

      <LocalForm
        open={modalAdicionarAberto}
        title="Adicionar local"
        formData={formData}
        handleChange={handleChange}
        onSubmit={handleAdicionarLocal}
        onCancel={handleFecharModalAdicionar}
        submitLabel="Adicionar"
        isLoading={isLoading}
        errors={errors}
        touched={touched}
      />

      <LocalForm
        open={modalEditarAberto}
        title={`Editar: ${localSelecionado?.nome || ''}`}
        formData={formData}
        handleChange={handleChange}
        onSubmit={handleEditarLocal}
        onCancel={handleFecharModalEditar}
        submitLabel="Salvar"
        isLoading={isLoading}
        errors={errors}
        touched={touched}
      />

      {localSelecionado && (
        <DeleteConfirmDialog
          open={modalExcluirAberto}
          title="Confirmação de exclusão"
          itemName={localSelecionado.nome}
          itemType="local"
          onConfirm={handleExcluirLocal}
          onCancel={handleFecharModalExcluir}
        />
      )}
    </PageContainer>
  );
};

export default Locais;