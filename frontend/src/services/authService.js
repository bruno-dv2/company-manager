import api from './api';

const login = async (credenciais) => {
  try {
    const resposta = await api.post('/auth/login', credenciais);
    
    sessionStorage.setItem('auth_token', resposta.data.token);
    sessionStorage.setItem('auth_refresh_token', resposta.data.refreshToken);
    sessionStorage.setItem('auth_user', JSON.stringify(resposta.data.usuario));
    
    return resposta.data;
  } catch (error) {
    handleAuthError(error);
  }
};

const cadastrar = async (dadosUsuario) => {
  try {
    const resposta = await api.post('/auth/cadastrar', dadosUsuario);
    
    sessionStorage.setItem('auth_token', resposta.data.token);
    sessionStorage.setItem('auth_refresh_token', resposta.data.refreshToken);
    sessionStorage.setItem('auth_user', JSON.stringify(resposta.data.usuario));
    
    return resposta.data;
  } catch (error) {
    handleAuthError(error);
  }
};

const logout = () => {
  sessionStorage.removeItem('auth_token');
  sessionStorage.removeItem('auth_refresh_token');
  sessionStorage.removeItem('auth_user');
};

const handleAuthError = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      throw new Error("Email ou senha incorretos.");
    } else if (error.response.status === 404) {
      throw new Error("Usuário não encontrado.");
    } else if (error.response.status === 409) {
      throw new Error("Email já cadastrado.");
    } else if (error.response.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Erro no servidor. Tente novamente mais tarde.");
    }
  }
  throw new Error("Não foi possível conectar ao servidor. Verifique sua conexão.");
};

const authService = {
  login,
  cadastrar,
  logout,
};

export default authService;