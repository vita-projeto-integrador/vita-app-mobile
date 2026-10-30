import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ScreenHeaderProps {
  title: string;
  // Com a seta de voltar (usada nas telas fora das abas)
  showBack?: boolean;
}

export function ScreenHeader({ title, showBack = false }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      {/* Espaço do mesmo tamanho da seta, para o título ficar centralizado */}
      <View style={styles.side} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5A623",
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  side: {
    width: 32,
  },
  title: {
    flex: 1,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
