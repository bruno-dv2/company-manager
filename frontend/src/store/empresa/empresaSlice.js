import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import empresaService from '../../services/empresaService';

export const listarEmpresas = createAsyncThunk(
  'empresa/listar',
  async (_, thunkAPI) => {
    try {
      return await empresaService.listarEmpresas();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Erro ao listar empresas'
      );
    }
  }
);

export const criarEmpresa = createAsyncThunk(
  'empresa/criar',
  async (dadosEmpresa, thunkAPI) => {
    try {
      return await empresaService.criarEmpresa(dadosEmpresa);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Erro ao criar empresa'
      );
    }
  }
);

export const atualizarEmpresa = createAsyncThunk(
  'empresa/atualizar',
  async ({ id, dadosEmpresa }, thunkAPI) => {
    try {
      return await empresaService.atualizarEmpresa(id, dadosEmpresa);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Erro ao atualizar empresa'
      );
    }
  }
);
  
export const removerEmpresa = createAsyncThunk(
  'empresa/remover',
  async (id, thunkAPI) => {
    try {
      await empresaService.removerEmpresa(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Erro ao remover empresa'
      );
    }
  }
);

const empresaSlice = createSlice({
  name: 'empresa',
  initialState: {
    empresas: [],
    empresaSelecionada: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    mensagem: '',
  },
  reducers: {
    resetEmpresa: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.mensagem = '';
    },
    selecionarEmpresa: (state, action) => {
      state.empresaSelecionada = action.payload;
    },
    limparEmpresaSelecionada: (state) => {
      state.empresaSelecionada = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listarEmpresas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listarEmpresas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.empresas = action.payload;
      })
      .addCase(listarEmpresas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.mensagem = action.payload;
      })
      
      .addCase(criarEmpresa.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(criarEmpresa.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.empresas.push(action.payload);
        state.mensagem = 'Empresa cadastrada com sucesso!'
      })
      .addCase(criarEmpresa.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.mensagem = action.payload;
      })
      
      .addCase(atualizarEmpresa.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(atualizarEmpresa.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mensagem = 'Empresa atualizada com sucesso!'
        state.empresas = state.empresas.map((empresa) =>
          empresa.id === action.payload.id ? action.payload : empresa
        );
        if (state.empresaSelecionada?.id === action.payload.id) {
          state.empresaSelecionada = action.payload;
        }
      })
      .addCase(atualizarEmpresa.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.mensagem = action.payload;
      })
      
      .addCase(removerEmpresa.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removerEmpresa.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mensagem = 'Empresa removida com sucesso!'
        state.empresas = state.empresas.filter(
          (empresa) => empresa.id !== action.payload
        );
        if (state.empresaSelecionada?.id === action.payload) {
          state.empresaSelecionada = null;
        }
      })
      .addCase(removerEmpresa.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.mensagem = action.payload;
      });
  },
});
  
export const { resetEmpresa, selecionarEmpresa, limparEmpresaSelecionada } = empresaSlice.actions;
export default empresaSlice.reducer;