import { isAxiosError } from "axios";
import type { ApiErrorBody } from "@/src/types/api";

// Mensagem para mostrar ao usuário a partir de um erro do axios
// (as telas continuam tratando o erro com try/catch)
export function getErrorMessage(error: unknown, fallback: string) {
  if (!isAxiosError<ApiErrorBody>(error)) return fallback;
  if (error.response?.data?.message) return error.response.data.message;
  if (error.code === "ECONNABORTED") return "A API demorou para responder.";
  if (!error.response)
    return "Sem conexão com a API. Confira a rede e o endereço da API.";
  return fallback;
}

// Status HTTP do erro (ex.: 409 = e-mail já cadastrado); null sem resposta da API
export function getErrorStatus(error: unknown) {
  return isAxiosError(error) ? (error.response?.status ?? null) : null;
}
