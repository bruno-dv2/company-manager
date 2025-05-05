import api from './api';

const listarLocaisPorEmpresa = async (empresaId) => {
  const resposta = await api.get(`/locais/empresa/${empresaId}`);
  return resposta.data;
};

const criarLocal = async (dadosLocal) => {
  const resposta = await api.post('/locais', dadosLocal);
  return resposta.data;
};

const atualizarLocal = async (id, dadosLocal) => {
  const resposta = await api.patch(`/locais/${id}`, dadosLocal);
  return resposta.data;
};

const removerLocal = async (id) => {
  await api.delete(`/locais/${id}`);
};

const localService = {
  listarLocaisPorEmpresa,
  criarLocal,
  atualizarLocal,
  removerLocal,
};

export default localService;