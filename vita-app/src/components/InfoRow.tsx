import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

interface InfoRowProps {
  icon: ComponentProps<typeof Ionicons>["name"];
  label: string;
  value?: string | null;
}

export function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={16} color="#F5A623" />
      </View>
      <View style={styles.texts}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value || "Não informado"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFF4E0",
    alignItems: "center",
    justifyContent: "center",
  },
  texts: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#999999",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: "#2E2E2E",
  },
});
