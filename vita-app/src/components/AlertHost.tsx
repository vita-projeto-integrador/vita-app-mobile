import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AlertData, registerAlertListener } from "@/src/utils/alert";

function getVariant(title: string) {
  const normalized = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalized.startsWith("erro")) {
    return { icon: "close-circle" as const, color: "#DC2626", bg: "#FEE2E2" };
  }
  if (normalized.startsWith("atencao")) {
    return { icon: "alert-circle" as const, color: "#D9720C", bg: "#FEF3C7" };
  }
  return { icon: "checkmark-circle" as const, color: "#16A34A", bg: "#DCFCE7" };
}

export function AlertHost() {
  const [alert, setAlert] = useState<AlertData | null>(null);

  useEffect(() => {
    registerAlertListener(setAlert);
    return () => registerAlertListener(null);
  }, []);

  const variant = alert ? getVariant(alert.title) : null;

  return (
    <Modal
      visible={alert !== null}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => setAlert(null)}
    >
      <View style={styles.overlay}>
        {alert && variant && (
          <View style={styles.card}>
            <View style={[styles.iconCircle, { backgroundColor: variant.bg }]}>
              <Ionicons name={variant.icon} size={32} color={variant.color} />
            </View>
            <Text style={styles.title}>{alert.title}</Text>
            {alert.message ? (
              <Text style={styles.message}>{alert.message}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setAlert(null)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Entendi</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E2E2E",
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#F5A623",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
