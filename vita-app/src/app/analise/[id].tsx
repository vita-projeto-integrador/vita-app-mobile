import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

// Tela provisória: o Passo 5 troca isso pelos detalhes de verdade
export default function AnalysisDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detalhes da análise {id}</Text>
    </View>
  );
}
