// Contrato da API TS: espelho dos DTOs de resposta (mesmo conteúdo do types/api.ts do Web)
// Envelope e paginação em inglês; campos de domínio em PT-BR (snake_case)

// ---- Envelope ----

export interface ApiFieldError {
  field: string | null;
  message: string;
}

export interface ApiResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorBody {
  success: false;
  message: string;
  detail?: unknown;
  errors?: ApiFieldError[];
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// ---- Enums ----

export type AnalysisStatus =
  | "em_espera"
  | "processando"
  | "finalizada"
  | "falhou";
export type ClassificationClass = "saudavel" | "infectado";
export type UserProfile = "produtor" | "estudante" | "outro";

// ---- Usuário ----

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: UserProfile;
}

export interface AuthData {
  usuario: Usuario;
  token: string;
}

// GET /user/me
export interface Perfil extends Usuario {
  telefone: string | null;
  endereco: string | null;
  data_nascimento: string | null; // AAAA-MM-DD
  cnpj: string | null;
  faculdade: string | null;
  curso: string | null;
  foto_perfil: string | null; // URL assinada
  criado_em: string;
  alterado_em: string;
}

// ---- Análises ----

export interface Localizacao {
  latitude: number;
  longitude: number;
  precisao: number; // raio de erro do GPS, em metros
}

export interface AnalysisListItem {
  id: string;
  status: AnalysisStatus;
  criado_em: string; // ISO em UTC
  total_imagens: number;
  miniatura: string | null; // URL assinada
  classificacao: { classe: ClassificationClass; confianca: number } | null;
}

export interface AnalysisImage {
  id: string;
  nome: string;
  url: string; // URL assinada da original
  tipo_mime: string;
  tamanho: number;
  processada: string | null; // URL assinada da pré-processada
}

export interface Classificacao {
  classe: ClassificationClass;
  confianca: number; // de 0 a 1
  tempo_execucao: number;
  modelo_cnn: string;
  versao_modelo: string;
  criado_em: string;
}

export interface AnalysisDetails {
  id: string;
  status: AnalysisStatus;
  localizacao: Localizacao | null; // null quando a análise não tem GPS
  criado_em: string;
  imagens: AnalysisImage[];
  classificacao: Classificacao | null; // null até finalizar ou se falhou
}

export interface CreatedAnalysis {
  id: string;
  status: "em_espera";
  enfileirada: boolean;
}

export interface AnalysisMapItem {
  id: string;
  status: AnalysisStatus;
  classe: ClassificationClass | null; // null enquanto não termina ou se falhou
  confianca: number | null;
  criado_em: string;
  latitude: number;
  longitude: number;
  precisao: number;
}

export interface MapFilters {
  from?: string;
  to?: string;
  status?: string; // ex.: "em_espera,processando"
  classe?: ClassificationClass;
}
