import type {
  AnalysisDetails,
  AnalysisListItem,
  AnalysisMapItem,
  ApiResponse,
  CreatedAnalysis,
  Localizacao,
  MapFilters,
  Paginated,
} from "@/src/types/api";
import { Platform } from "react-native";
import api from "./api";

// Máximo que a API aceita por página
const MAX_LIMIT = 100;

// Uma foto pronta para envio (câmera ou galeria)
export interface Photo {
  uri: string;
  capturadaEm: string | null; // ISO 8601; null na galeria
  localizacao: Localizacao | null; // null na galeria ou sem GPS
}

// Envia de 1 a 4 fotos (já preparadas em JPEG) para classificação
export async function createAnalysis(photos: Photo[]) {
  const formData = new FormData();

  for (let index = 0; index < photos.length; index++) {
    const uri = photos[index].uri;
    const name = `foto-${index + 1}.jpg`;

    if (Platform.OS === "web") {
      // No navegador o anexo precisa ser um arquivo (Blob) de verdade
      const blob = await (await fetch(uri)).blob();
      formData.append("images", blob, name);
    } else {
      // No React Native o arquivo entra como { uri, name, type }
      formData.append("images", {
        uri,
        name,
        type: "image/jpeg",
      } as any);
    }
  }

  // Dados de cada foto, na mesma ordem dos arquivos (nomes do contrato da API)
  const metadata = photos.map((photo) => ({
    capturada_em: photo.capturadaEm,
    localizacao: photo.localizacao,
  }));
  formData.append("metadata", JSON.stringify(metadata));

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

// Lista as análises de um período (from e to em ISO 8601), da mais nova para a mais antiga
export async function getAnalyses(
  from: string,
  to: string,
  page = 1,
  limit = MAX_LIMIT,
) {
  const response = await api.get<ApiResponse<Paginated<AnalysisListItem>>>(
    "/analysis",
    {
      params: { page, limit, from, to },
    },
  );
  return response.data;
}

// Últimas análises, sem filtro de período (a API já ordena da mais nova para a mais antiga)
export async function getRecentAnalyses(limit: number) {
  const response = await api.get<ApiResponse<Paginated<AnalysisListItem>>>("/analysis", {
    params: { page: 1, limit },
  });
  return response.data;
}

export async function getAnalysisDetails(id: string) {
  const response = await api.get<ApiResponse<AnalysisDetails>>(
    `/analysis/${id}`,
  );
  return response.data;
}

// Pontos do mapa (filtros vazios são omitidos pelo axios)
export async function getMapAnalyses(filters: MapFilters) {
  const response = await api.get<ApiResponse<Paginated<AnalysisMapItem>>>(
    "/analysis/map",
    {
      params: filters,
    },
  );
  return response.data;
}
