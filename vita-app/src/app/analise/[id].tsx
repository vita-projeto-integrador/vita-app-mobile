import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { InfoRow } from "@/src/components/InfoRow";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import {
  getAnalysisDetails,
  getImageUrl,
} from "@/src/services/analysisService";
import type { AnalysisDetails } from "@/src/services/analysisService";
import { styles } from "@/src/styles/analise.styles";
import { ACTION_PLAN, getResultLabel, isBlackSpot } from "@/src/utils/analysis";
import { formatDate, formatTime } from "@/src/utils/date";

type Tab = "dados" | "plano";

export default function AnalysisDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [details, setDetails] = useState<AnalysisDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("dados");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    async function loadDetails() {
      try {
        const response = await getAnalysisDetails(id);
        setDetails(response.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Não foi possível carregar a análise.",
        );
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [id]);

  const header = <ScreenHeader title="Detalhes da análise" showBack />;

  if (loading) {
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#F5A623" />
        </View>
      </View>
    );
  }

  if (error || !details) {
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.centered}>
          <Text style={styles.message}>{error}</Text>
        </View>
      </View>
    );
  }

  // Só análises finalizadas têm resultado
  if (details.status !== "finalizada") {
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.centered}>
          <Text style={styles.message}>
            {details.status === "cancelada"
              ? "Esta análise falhou."
              : "Esta análise ainda está em processamento."}
          </Text>
        </View>
      </View>
    );
  }

  const images = details.imagem ?? [];
  const classificacao = details.classificacao;
  const classe = classificacao?.classe;
  const hasResult = classe !== undefined && classe !== null;
  const resultColor = hasResult && isBlackSpot(classe) ? "#DC2626" : "#16A34A";
  const resultBackground =
    hasResult && isBlackSpot(classe) ? "#FEE2E2" : "#DCFCE7";
  const confidence = classificacao ? classificacao.confianca * 100 : 0;

  // As miniaturas são as fotos que não estão na grande
  const thumbIndexes = images
    .map((_, index) => index)
    .filter((index) => index !== selectedIndex);

  return (
    <View style={styles.container}>
      {header}

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === "dados" && styles.tabActive]}
          onPress={() => setTab("dados")}
        >
          <Text
            style={[styles.tabText, tab === "dados" && styles.tabTextActive]}
          >
            Dados da análise
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === "plano" && styles.tabActive]}
          onPress={() => setTab("plano")}
        >
          <Text
            style={[styles.tabText, tab === "plano" && styles.tabTextActive]}
          >
            Plano de ação
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {tab === "dados" ? (
          <>
            {images.length > 0 && (
              <View style={styles.gallery}>
                <Image
                  source={{ uri: getImageUrl(images[selectedIndex].caminho) }}
                  style={styles.mainImage}
                />
                <View style={styles.thumbs}>
                  {thumbIndexes.map((index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedIndex(index)}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={{ uri: getImageUrl(images[index].caminho) }}
                        style={styles.thumb}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.infoBlock}>
              <InfoRow
                icon="calendar-outline"
                label="Data"
                value={formatDate(details.createdAt)}
              />
              <InfoRow
                icon="time-outline"
                label="Hora"
                value={formatTime(details.createdAt)}
              />
              <InfoRow
                icon="images-outline"
                label="Imagens"
                value={String(images.length)}
              />
            </View>

            {hasResult && classificacao && (
              <>
                <Text style={styles.sectionTitle}>Resultados da IA</Text>
                <View
                  style={[
                    styles.resultBadge,
                    { backgroundColor: resultBackground },
                  ]}
                >
                  <Text
                    style={[styles.resultBadgeText, { color: resultColor }]}
                  >
                    {getResultLabel(classe)}
                  </Text>
                </View>

                <View style={styles.confidenceRow}>
                  <Text style={styles.confidenceLabel}>
                    Confiança do modelo
                  </Text>
                  <Text style={styles.confidenceValue}>
                    {confidence.toFixed(1)}%
                  </Text>
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { width: `${confidence}%`, backgroundColor: resultColor },
                    ]}
                  />
                </View>

                <Text style={styles.footerText}>
                  Modelo: {classificacao.modelo_cnn} · Tempo de execução:{" "}
                  {classificacao.tempo_execucao} ms
                </Text>
              </>
            )}
          </>
        ) : (
          <>
            {hasResult &&
              (ACTION_PLAN[classe] ?? []).map((card) => (
                <View key={card.titulo} style={styles.planCard}>
                  <Text style={styles.planTitle}>{card.titulo}</Text>
                  <Text style={styles.planText}>{card.texto}</Text>
                </View>
              ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
