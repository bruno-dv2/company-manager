import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import localService from '../../services/localService';

export const listarLocaisPorEmpresa = createAsyncThunk(
  'local/listarPorEmpresa',
  async (empresaId, thunkAPI) => {
    try {
      return await localService.listarLocaisPorEmpresa(empresaId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Erro ao listar locais');
    }
  }
);

export const criarLocal = createAsyncThunk(
  'local/criar',
  async (dadosLocal, thunkAPI) => {
    try {
      return await localService.criarLocal(dadosLocal);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Erro ao criar local');
    }
  }
);

export const atualizarLocal = createAsyncThunk(
  'local/atualizar',
  async ({ id, dadosLocal }, thunkAPI) => {
    try {
      return await localService.atualizarLocal(id, dadosLocal);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Erro ao atualizar local');
    }
  }
);

export const removerLocal = createAsyncThunk(
  'local/remover',
  async (id, thunkAPI) => {
    try {
      await localService.removerLocal(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Erro ao remover local');
    }
  }
);

const localSlice = createSlice({
  name: 'local',
  initialState: {
    locais: [],
    localSelecionado: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    mensagem: '',
  },
  reducers: {
    resetLocal: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.mensagem = '';
    },
    selecionarLocal: (state, action) => {
      state.localSelecionado = action.payload;
    },
    limparLocalSelecionado: (state) => {
      state.localSelecionado = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listarLocaisPorEmpresa.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listarLocaisPorEmpresa.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.locais = action.payload;
      })
      .addCase(listarLocaisPorEmpresa.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.mensagem = action.payload;
      })
      .addCase(criarLocal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(criarLocal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mensagem = 'Local criado com sucesso!'
        state.locais.push(action.payload);
      })
      .addCase(criarLocal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.mensagem = action.payload;
      })
      .addCase(atualizarLocal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(atualizarLocal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mensagem = 'Local atualizado com sucesso!'
        state.locais = state.locais.map((local) =>
          local.id === action.payload.id ? action.payload : local
        );
        if (state.localSelecionado?.id === action.payload.id) {
          state.localSelecionado = action.payload;
        }
      })
      .addCase(atualizarLocal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.mensagem = action.payload;
      })
      .addCase(removerLocal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removerLocal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mensagem = 'Local removido com sucesso!'
        state.locais = state.locais.filter((local) => local.id !== action.payload);
        if (state.localSelecionado?.id === action.payload) {
          state.localSelecionado = null;
        }
      })
      .addCase(removerLocal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.mensagem = action.payload;
      });
  },
});

export const { resetLocal, selecionarLocal, limparLocalSelecionado } = localSlice.actions;
export default localSlice.reducer;