import api from "./api";
import type { ApiResponse, Perfil } from "@/src/types/api";

// A API identifica o usuário pelo token enviado
export async function getProfile() {
  const response = await api.get<ApiResponse<Perfil>>("/user/me");
  return response.data;
}
