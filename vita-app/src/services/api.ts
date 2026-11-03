import axios from 'axios';
import { getToken } from '../storage/tokenStorage';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Envia o token salvo em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Quem trata a sessão expirada é o AuthContext (registrado por ele).
// Fica aqui como callback porque este arquivo não tem acesso ao React.
let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

// 401 numa requisição que levou token = token expirado ou inválido: desloga.
// Requisições sem token (ex.: login com senha errada) seguem para a tela tratar.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const sentToken = !!error?.config?.headers?.Authorization;
    if (error?.response?.status === 401 && sentToken) {
      onUnauthorized?.();
    }
    return Promise.reject(error);
  },
);

export default api;
