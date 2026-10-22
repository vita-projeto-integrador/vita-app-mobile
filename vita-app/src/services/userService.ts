import api from './api';

export interface UserProfile {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  data_nascimento: string | null;
  tipo_acesso: 'produtor' | 'estudante';
  endereco: string | null;
  cnpj: string | null;
  faculdade: string | null;
  curso: string | null;
  createdAt: string;
}

// A API identifica o usuário pelo token enviado
export async function getProfile() {
  const response = await api.get('/user/');
  return response.data;
}
