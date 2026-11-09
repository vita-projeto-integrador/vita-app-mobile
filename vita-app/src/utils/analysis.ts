import type {
  AnalysisListItem,
  AnalysisStatus,
  ClassificationClass,
} from "@/src/types/api";

// Status que aparecem na aba "Em andamento"
export const IN_PROGRESS: AnalysisStatus[] = ["em_espera", "processando"];

export function isInProgress(status: AnalysisStatus) {
  return IN_PROGRESS.includes(status);
}

// Rótulo de cada status na lista (Record: status novo na API vira erro de tipo aqui)
export const STATUS_LABELS: Record<AnalysisStatus, string> = {
  em_espera: "Na fila",
  processando: "Classificando",
  finalizada: "Finalizada",
  falhou: "Falhou",
};

// A API devolve a classe como texto: "infectado" = pinta preta, "saudavel" = saudável
export function isBlackSpot(classe: ClassificationClass) {
  return classe === "infectado";
}

// Badge curto da lista
export function getBadgeLabel(classe: ClassificationClass) {
  return isBlackSpot(classe) ? "Detectada" : "Saudável";
}

// Texto completo do resultado, nos detalhes
export function getResultLabel(classe: ClassificationClass) {
  return isBlackSpot(classe) ? "Pinta preta detectada" : "Saudável";
}

// ---- Badge de status/resultado (lista do histórico e home) ----

export type BadgeVariant = "red" | "green" | "gray" | "amber";

// Decide o texto e a cor do badge de uma análise da lista
export function getAnalysisBadge(item: AnalysisListItem): {
  label: string;
  variant: BadgeVariant;
} {
  if (item.status === "falhou") {
    return { label: STATUS_LABELS.falhou, variant: "gray" };
  }
  if (isInProgress(item.status)) {
    return { label: STATUS_LABELS[item.status], variant: "amber" };
  }
  if (item.classificacao) {
    const { classe } = item.classificacao;
    return {
      label: getBadgeLabel(classe),
      variant: isBlackSpot(classe) ? "red" : "green",
    };
  }
  return { label: STATUS_LABELS[item.status], variant: "gray" };
}

// Cores de cada tipo de badge
export const BADGE_COLORS: Record<
  BadgeVariant,
  { container: { backgroundColor: string }; text: { color: string } }
> = {
  red: {
    container: { backgroundColor: "#FEE2E2" },
    text: { color: "#DC2626" },
  },
  green: {
    container: { backgroundColor: "#DCFCE7" },
    text: { color: "#16A34A" },
  },
  gray: {
    container: { backgroundColor: "#E2E8F0" },
    text: { color: "#475569" },
  },
  amber: {
    container: { backgroundColor: "#FEF3C7" },
    text: { color: "#B45309" },
  },
};

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
export const ACTION_PLAN: Record<
  ClassificationClass,
  { titulo: string; texto: string }[]
> = {
  saudavel: [
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
  infectado: [
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
