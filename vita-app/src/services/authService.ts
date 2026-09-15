import api from './api';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  birthDate?: string;
  accessType: 'produtor' | 'estudante';
  address?: string;
  cnpj?: string;
  highSchool?: string;
  course?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const response = await api.post('/user/', data);
  return response.data;
}

export async function loginUser(data: LoginData) {
  const response = await api.post('/login/', data);
  return response.data;
}