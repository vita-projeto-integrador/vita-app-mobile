import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

// Mesmas regras do registerStep2Schema (src/validation/schemas.ts)
const REQUIREMENTS = [
  { label: "Mínimo de 8 caracteres", test: (v: string) => v.length >= 8 },
  { label: "Uma letra maiúscula", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Um número", test: (v: string) => /[0-9]/.test(v) },
  {
    label: "Um caractere especial",
    test: (v: string) => /[^a-zA-Z0-9]/.test(v),
  },
];

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <View style={styles.container}>
      {REQUIREMENTS.map((item) => {
        const ok = item.test(password);
        return (
          <View key={item.label} style={styles.row}>
            <Ionicons
              name={ok ? "checkmark-circle" : "ellipse-outline"}
              size={16}
              color={ok ? "#16A34A" : "#9CA3AF"}
            />
            <Text style={[styles.text, ok && styles.textOk]}>{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginBottom: 12,
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 13,
    color: "#6B6B6B",
  },
  textOk: {
    color: "#16A34A",
  },
});