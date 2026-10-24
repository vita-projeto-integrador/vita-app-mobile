import api from "./api";

// Resposta padrão da API: { success, message, data }
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type AnalysisStatus =
  | "pendente"
  | "em_fila"
  | "classificando"
  | "finalizada"
  | "cancelada";

export interface AnalysisListItem {
  id: string;
  status: AnalysisStatus;
  createdAt: string; // vem em UTC
  imagesCount: number;
  thumbnail: string | null;
  // classe: 1 = pinta preta, 0 = saudável (chega como número)
  classificacao: { classe: number; confianca: number } | null;
}

export interface AnalysisDetails {
  id: string;
  status: AnalysisStatus;
  createdAt: string;
  imagem: { caminho: string }[];
  classificacao: {
    classe: number;
    confianca: number; // de 0 a 1
    tempo_execucao: number;
    modelo_cnn: string;
  } | null;
}

export interface CreatedAnalysis {
  analysis: { id: string; status: AnalysisStatus; createdAt: string };
  queued: boolean;
}

// Envia as 4 fotos (já preparadas em JPEG) para classificação
export async function createAnalysis(photoUris: string[]) {
  const formData = new FormData();
  photoUris.forEach((uri, index) => {
    // No React Native o arquivo entra como { uri, name, type }
    formData.append("images", {
      uri,
      name: `foto-${index + 1}.jpg`,
      type: "image/jpeg",
    } as any);
  });

  // O api.ts usa application/json por padrão; aqui precisa ser multipart
  const response = await api.post<ApiResponse<CreatedAnalysis>>(
    "/analysis",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 30000,
    },
  );
  return response.data;
}

// Lista as análises de um período (from e to em ISO 8601)
export async function getAnalyses(from: string, to: string, page = 1) {
  const response = await api.get<ApiResponse<AnalysisListItem[]>>("/analysis", {
    params: { page, from, to },
  });
  return response.data;
}

export async function getAnalysisDetails(id: string) {
  const response = await api.get<ApiResponse<AnalysisDetails>>(
    `/analysis/${id}`,
  );
  return response.data;
}

// Monta a URL completa de uma imagem a partir do caminho que a API devolve
export function getImageUrl(caminho: string) {
  const base = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
  return `${base}/${caminho.replace(/^\/+/, "")}`;
}
