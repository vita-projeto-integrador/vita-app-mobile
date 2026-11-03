import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InfoRow } from "@/src/components/InfoRow";
import type { AnalysisMapItem } from "@/src/services/analysisService";
import { formatDate, formatTime } from "@/src/utils/date";
import { getMapLabel, getPinColor } from "@/src/utils/map";

interface MapAnalysisCardProps {
  item: AnalysisMapItem;
  onClose: () => void;
}

// Resumo do ponto tocado. Usa os dados que já vieram da rota do mapa.
export function MapAnalysisCard({ item, onClose }: MapAnalysisCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: getPinColor(item) }]} />
        <Text style={styles.title}>{getMapLabel(item)}</Text>
        <TouchableOpacity onPress={onClose} hitSlop={12}>
          <Ionicons name="close" size={22} color="#64748B" />
        </TouchableOpacity>
      </View>

      <InfoRow
        icon="calendar-outline"
        label="Data"
        value={`${formatDate(item.createdAt)} às ${formatTime(item.createdAt)}`}
      />
      {item.confianca !== null && (
        <InfoRow
          icon="analytics-outline"
          label="Confiança do modelo"
          value={`${(item.confianca * 100).toFixed(1)}%`}
        />
      )}
      <InfoRow
        icon="locate-outline"
        label="Precisão do GPS"
        value={`± ${Math.round(item.precisao)} m`}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(`/analise/${item.id}`)}
      >
        <Text style={styles.buttonText}>Ver detalhes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    left: 16,
    right: 16,
    // Fica acima do botão da câmera
    bottom: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#F5A623",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
