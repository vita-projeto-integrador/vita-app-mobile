import api from "./api";
import type { ApiResponse, AuthData, UserProfile } from "@/src/types/api";

// Corpo do cadastro no contrato da API (campos vazios vão como undefined)
export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  perfil: UserProfile;
  telefone?: string;
  data_nascimento?: string; // AAAA-MM-DD
  endereco?: string;
  cnpj?: string;
  faculdade?: string;
  curso?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const response = await api.post<ApiResponse<AuthData>>(
    "/user/register",
    data,
  );
  return response.data;
}

export async function loginUser({ email, password }: LoginData) {
  const response = await api.post<ApiResponse<AuthData>>("/user/login", {
    email,
    senha: password, // nome do campo no contrato da API
  });
  return response.data;
}
