import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#FFF7ED",
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#F5A623",
  },
  tabText: {
    fontSize: 14,
    color: "#64748B",
  },
  tabTextActive: {
    color: "#9A3412",
    fontWeight: "600",
  },
  columns: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  columnLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
    textAlign: "center",
  },
  columnId: {
    width: 56,
  },
  columnTime: {
    flex: 1,
  },
  columnResult: {
    width: 104,
  },
  columnImages: {
    width: 64,
    textAlign: "right",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 14,
    marginTop: 40,
  },
});
