import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AnalysesMap } from "@/src/components/AnalysesMap";
import { MapAnalysisCard } from "@/src/components/MapAnalysisCard";
import { MapFilters } from "@/src/components/MapFilters";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import { getMapAnalyses } from "@/src/services/analysisService";
import type { AnalysisMapItem, ClassificationClass } from "@/src/types/api";
import { styles } from "@/src/styles/mapa.styles";
import { showAlert } from "@/src/utils/alert";
import { getErrorMessage } from "@/src/utils/apiError";
import { getPeriodRange, MAP_LEGEND } from "@/src/utils/map";
import type { Period } from "@/src/utils/map";

export default function MapaScreen() {
  // Filtros (valores iniciais: últimos 30 dias, todos os status e classes)
  const [period, setPeriod] = useState<Period>("30d");
  const [status, setStatus] = useState("");
  const [classe, setClasse] = useState<ClassificationClass | "">("");

  const [analyses, setAnalyses] = useState<AnalysisMapItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AnalysisMapItem | null>(null);

  const loadAnalyses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getMapAnalyses({
        ...getPeriodRange(period),
        status: status || undefined, // "" = sem filtro
        classe: classe || undefined,
      });
      setAnalyses(response.data.items);
      setTotal(response.data.total);
      setSelected(null);
    } catch (error) {
      showAlert(
        "Erro",
        getErrorMessage(error, "Não foi possível carregar o mapa."),
      );
    } finally {
      setLoading(false);
    }
  }, [period, status, classe]);

  // Recarrega ao abrir a aba e sempre que um filtro muda
  useFocusEffect(
    useCallback(() => {
      loadAnalyses();
    }, [loadAnalyses]),
  );

  // Só análises finalizadas têm classe: escolher uma classe fixa o status
  function handleChangeClasse(value: ClassificationClass | "") {
    setClasse(value);
    if (value) setStatus("finalizada");
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Mapa" />

      <View style={styles.filters}>
        <MapFilters
          period={period}
          status={status}
          classe={classe}
          onChangePeriod={setPeriod}
          onChangeStatus={setStatus}
          onChangeClasse={handleChangeClasse}
        />
      </View>

      <View style={styles.mapArea}>
        <AnalysesMap analyses={analyses} onSelect={setSelected} />

        <View style={styles.legend}>
          {MAP_LEGEND.map((entry) => (
            <View key={entry.label} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: entry.color }]}
              />
              <Text style={styles.legendText}>{entry.label}</Text>
            </View>
          ))}
        </View>

        {!loading && analyses.length === 0 && (
          <Text style={styles.notice}>
            Nenhuma análise com localização neste filtro
          </Text>
        )}
        {total > analyses.length && (
          <Text style={styles.notice}>
            Mostrando as {analyses.length} mais recentes de {total}
          </Text>
        )}

        {loading && (
          <ActivityIndicator
            size="large"
            color="#F5A623"
            style={styles.loading}
          />
        )}

        {selected && (
          <MapAnalysisCard item={selected} onClose={() => setSelected(null)} />
        )}
      </View>
    </View>
  );
}
