import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  filters: {
    paddingVertical: 8,
    gap: 4,
  },
  mapArea: {
    flex: 1,
  },
  legend: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 8,
    padding: 8,
    gap: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#334155",
  },
  notice: {
    position: "absolute",
    top: 12,
    right: 12,
    maxWidth: "55%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 8,
    padding: 8,
    fontSize: 12,
    color: "#334155",
  },
  loading: {
    position: "absolute",
    top: "45%",
    alignSelf: "center",
  },
});
