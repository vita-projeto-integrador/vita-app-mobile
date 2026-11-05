import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#F5A623",
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  searchInput: {
    fontSize: 14,
    color: "#2E2E2E",
  },
  searchIconCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 120,
  },
  statsRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  statCardLight: {
    backgroundColor: "#F5A00F",
  },
  statCardDark: {
    backgroundColor: "#DB7608",
  },
  statNumber: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 24,
  },
  metricsLink: {
    textAlign: "right",
    color: "#DB7608",
    fontSize: 14,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#334155",
    marginBottom: 12,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEFAE8",
    borderRadius: 16,
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    gap: 10,
  },
  taskDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  taskArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DB7608",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  actionButtonPrimary: {
    backgroundColor: "#F5A00F",
    marginTop: 30,
  },
  actionButtonSecondary: {
    backgroundColor: "#DB7608",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 16,
  },
});
