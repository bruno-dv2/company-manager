import api from './api';

const listarEmpresas = async () => {
  const resposta = await api.get('/empresas');
  return resposta.data;
};

const criarEmpresa = async (dadosEmpresa) => {
  const resposta = await api.post('/empresas', dadosEmpresa);
  return resposta.data;
};

const atualizarEmpresa = async (id, dadosEmpresa) => {
  const resposta = await api.patch(`/empresas/${id}`, dadosEmpresa);
  return resposta.data;
};

const removerEmpresa = async (id) => {
  await api.delete(`/empresas/${id}`);
};

const empresaService = {
  listarEmpresas,
  criarEmpresa,
  atualizarEmpresa,
  removerEmpresa,
};

export default empresaService;