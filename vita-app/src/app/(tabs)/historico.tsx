import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AnalysisRow } from "@/src/components/AnalysisRow";
import { DayPicker } from "@/src/components/DayPicker";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import { getAnalyses } from "@/src/services/analysisService";
import type { AnalysisListItem } from "@/src/services/analysisService";
import { styles } from "@/src/styles/historico.styles";
import {
  FAILED_NOTICE,
  IN_PROGRESS_NOTICE,
  isInProgress,
} from "@/src/utils/analysis";
import { showAlert } from "@/src/utils/alert";
import { getDayRange } from "@/src/utils/date";

type Tab = "finalizadas" | "andamento";

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function HistoricoScreen() {
  const { aba, enviadoEm } = useLocalSearchParams<{
    aba?: string;
    enviadoEm?: string;
  }>();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tab, setTab] = useState<Tab>("finalizadas");
  const [analyses, setAnalyses] = useState<AnalysisListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Só as análises do dia escolhido, da mais nova para a mais antiga
  const dayAnalyses = analyses
    .filter((item) => isSameDay(new Date(item.createdAt), selectedDate))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  const inProgressCount = dayAnalyses.filter((item) =>
    isInProgress(item.status),
  ).length;
  const visible = dayAnalyses.filter((item) =>
    tab === "andamento"
      ? isInProgress(item.status)
      : !isInProgress(item.status),
  );

  // Recarregamentos automáticos (silent) não mostram alerta de erro
  const loadAnalyses = useCallback(
    async (silent = false) => {
      try {
        const { from, to } = getDayRange(selectedDate);
        const response = await getAnalyses(from, to);
        setAnalyses(Array.isArray(response.data) ? response.data : []);
      } catch (error: any) {
        if (!silent) {
          showAlert(
            "Erro",
            error?.response?.data?.message ||
              "Não foi possível carregar as análises.",
          );
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [selectedDate],
  );

  const hasInProgress = analyses.some((item) => isInProgress(item.status));

  // Recarrega ao ganhar foco e a cada 5 s enquanto houver análise em andamento
  useFocusEffect(
    useCallback(() => {
      loadAnalyses();
      if (!hasInProgress) return;
      const timer = setInterval(() => loadAnalyses(true), 5000);
      return () => clearInterval(timer);
    }, [loadAnalyses, hasInProgress]),
  );

  // Vindo da câmera: seleciona hoje e a aba "Em andamento"
  useEffect(() => {
    if (!enviadoEm) return;
    if (aba === "andamento") {
      setSelectedDate(new Date());
      setTab("andamento");
    }
  }, [aba, enviadoEm]);

  function handleRefresh() {
    setRefreshing(true);
    loadAnalyses();
  }

  function handlePressItem(item: AnalysisListItem) {
    if (item.status === "finalizada") {
      router.push(`/analise/${item.id}`);
      return;
    }
    const notice =
      item.status === "cancelada" ? FAILED_NOTICE : IN_PROGRESS_NOTICE;
    showAlert(notice.title, notice.message);
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Análises" />
      <DayPicker selectedDate={selectedDate} onChange={setSelectedDate} />

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === "finalizadas" && styles.tabActive]}
          onPress={() => setTab("finalizadas")}
        >
          <Text
            style={[
              styles.tabText,
              tab === "finalizadas" && styles.tabTextActive,
            ]}
          >
            Finalizadas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === "andamento" && styles.tabActive]}
          onPress={() => setTab("andamento")}
        >
          <Text
            style={[
              styles.tabText,
              tab === "andamento" && styles.tabTextActive,
            ]}
          >
            Em andamento{inProgressCount > 0 ? ` (${inProgressCount})` : ""}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#F5A623" />
        </View>
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AnalysisRow item={item} onPress={() => handlePressItem(item)} />
          )}
          ListHeaderComponent={
            <View style={styles.columns}>
              <Text style={[styles.columnLabel, styles.columnId]}>id</Text>
              <Text style={[styles.columnLabel, styles.columnTime]}>Hora</Text>
              <Text style={[styles.columnLabel, styles.columnResult]}>
                Resultado
              </Text>
              <Text style={[styles.columnLabel, styles.columnImages]}>
                Imagens
              </Text>
            </View>
          }
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhuma análise neste dia</Text>
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}
    </View>
  );
}
