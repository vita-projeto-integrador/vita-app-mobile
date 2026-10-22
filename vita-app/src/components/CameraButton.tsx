import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

interface CameraButtonProps {
  onPress?: () => void;
}

export function CameraButton({ onPress }: CameraButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="camera-outline" size={34} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 20,
    // Fica acima da barra de abas (64px de altura)
    bottom: 84,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#F5A00F",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
});
