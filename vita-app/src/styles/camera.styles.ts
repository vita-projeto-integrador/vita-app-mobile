import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 20,
  },
  permissionText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  permissionButton: {
    backgroundColor: "#F5A623",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  permissionButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
});
