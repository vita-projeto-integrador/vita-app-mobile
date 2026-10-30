import type { AnalysisStatus } from "@/src/services/analysisService";

// Status que aparecem na aba "Em andamento"
export const IN_PROGRESS: AnalysisStatus[] = [
  "pendente",
  "em_fila",
  "classificando",
];

export function isInProgress(status: AnalysisStatus) {
  return IN_PROGRESS.includes(status);
}

// Rótulo de cada status na lista
export const STATUS_LABELS: Record<AnalysisStatus, string> = {
  pendente: "Aguardando",
  em_fila: "Na fila",
  classificando: "Classificando",
  finalizada: "Finalizada",
  cancelada: "Falhou",
};

// A API devolve a classe como número: 1 = pinta preta, 0 = saudável
export function isBlackSpot(classe: number) {
  return classe === 1;
}

// Badge curto da lista
export function getBadgeLabel(classe: number) {
  return isBlackSpot(classe) ? "Detectada" : "Saudável";
}

// Texto completo do resultado, nos detalhes
export function getResultLabel(classe: number) {
  return isBlackSpot(classe) ? "Pinta preta detectada" : "Saudável";
}

// Avisos ao tocar numa análise que não está finalizada
export const IN_PROGRESS_NOTICE = {
  title: "Análise em andamento",
  message: "Aguarde a classificação terminar para ver os detalhes.",
};

export const FAILED_NOTICE = {
  title: "Análise falhou",
  message: "A análise falhou, envie as fotos de novo.",
};

// Plano de ação por classe (mesmos textos do web)
export const ACTION_PLAN: Record<number, { titulo: string; texto: string }[]> =
  {
    0: [
      {
        titulo: "Monitoramento",
        texto:
          "Aplicação de defensivos cúpricos (à base de cobre) durante o crescimento dos frutos.",
      },
      {
        titulo: "Nutrição preventiva",
        texto: "Reforço nutricional com Potássio, Cálcio e de fosfitos",
      },
      {
        titulo: "Biossegurança",
        texto:
          "Manter maquinários e ferramentas lavadas para evitar a contaminação vinda de outras áreas",
      },
    ],
    1: [
      {
        titulo: "Pulverização preventiva",
        texto:
          "Revisão do calendário de pulverização e aplicação de fungicida localizado",
      },
      {
        titulo: "Manejo de serrapilheira",
        texto:
          "Triturar folhas caídas e aplicar produtos para acelerar decomposição",
      },
      {
        titulo: "Podas de ventilação",
        texto: "Realizar podas para melhorar ventilação e iluminação",
      },
      {
        titulo: "Monitoramento contínuo",
        texto: "Agende novas fotos do mesmo pé e intensifique as inspeções",
      },
    ],
  };
