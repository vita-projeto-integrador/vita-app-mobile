import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  message: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
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
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  gallery: {
    flexDirection: "row",
    gap: 12,
  },
  mainImage: {
    flex: 1,
    height: 244,
    borderRadius: 16,
    backgroundColor: "#E2E8F0",
  },
  thumbs: {
    width: 76,
    gap: 8,
  },
  thumb: {
    width: 76,
    height: 76,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
  },
  infoBlock: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginTop: 20,
    marginBottom: 10,
  },
  resultBadge: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  resultBadgeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  confidenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 8,
  },
  confidenceLabel: {
    fontSize: 14,
    color: "#475569",
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  barTrack: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 6,
  },
  footerText: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 16,
  },
  planCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#F5A623",
  },
  planTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  planText: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 19,
  },
});
