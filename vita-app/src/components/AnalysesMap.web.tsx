import { StyleSheet, Text, View } from "react-native";
import type { AnalysisMapItem } from "@/src/types/api";

// Versão web do AnalysesMap.
// O react-native-maps só funciona em Android/iOS: no navegador ele quebra o
// bundle inteiro (codegenNativeComponent não existe no react-native-web).
// O Metro usa este arquivo no lugar de AnalysesMap.tsx quando a plataforma é web.

interface AnalysesMapProps {
  analyses: AnalysisMapItem[];
  onSelect: (item: AnalysisMapItem) => void;
}

export function AnalysesMap({ analyses }: AnalysesMapProps) {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Text style={styles.title}>Mapa disponível apenas no app</Text>
      <Text style={styles.subtitle}>
        Abra o Vita no celular para ver as {analyses.length} análises no mapa.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#E6F4FE",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
});
