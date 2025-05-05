import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

const getInitialState = () => {
  return {
    usuario: JSON.parse(sessionStorage.getItem('auth_user')) || null,
    token: sessionStorage.getItem('auth_token') || null,
    refreshToken: sessionStorage.getItem('auth_refresh_token') || null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    mensagem: '',
  };
};

export const login = createAsyncThunk(
  'auth/login',
  async (credenciais, thunkAPI) => {
    try {
      return await authService.login(credenciais);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const cadastrar = createAsyncThunk(
  'auth/cadastrar',
  async (dadosUsuario, thunkAPI) => {
    try {
      return await authService.cadastrar(dadosUsuario);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    resetAuth: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.mensagem = '';
    },
    setToken: (state, action) => {
      state.token = action.payload;
      sessionStorage.setItem('auth_token', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.mensagem = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        const { usuario, token, refreshToken } = action.payload;
        state.usuario = usuario;
        state.token = token;
        state.refreshToken = refreshToken;
        state.isLoading = false;
        state.isSuccess = true;
        state.mensagem = 'Login realizado com sucesso!'
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.mensagem = action.payload || 'Falha no login';
        state.usuario = null;
        state.token = null;
        state.refreshToken = null;
      })      
      .addCase(cadastrar.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.mensagem = '';
      })
      .addCase(cadastrar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.usuario = action.payload.usuario;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(cadastrar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.mensagem = action.payload;
        state.usuario = null;
        state.token = null;
        state.refreshToken = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.usuario = null;
        state.token = null;
        state.refreshToken = null;
        state.isSuccess = false;
      });
  },
});

export const { resetAuth, setToken } = authSlice.actions;
export default authSlice.reducer;