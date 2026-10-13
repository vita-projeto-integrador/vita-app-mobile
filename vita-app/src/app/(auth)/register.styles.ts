import { StyleSheet } from "react-native";

export const ORANGE = "#F5A623";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
  flexGrow: 1,
  paddingHorizontal: 32,   
  paddingTop: 100,
},
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B6B6B",
  },
  brand: {
    color: ORANGE,
    fontWeight: "600",
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#1A1A1A",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: ORANGE,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
  progressTrack: {
    height: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
    marginTop: 48,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: ORANGE,
    borderRadius: 2,
  },
  footer: {
    paddingBottom: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: "#4A4A4A",
  },
  footerLink: {
    color: ORANGE,
    fontWeight: "600",
  },
    optionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  optionButtonSelected: {
    borderColor: ORANGE,
    backgroundColor: "#FFF4E6",
  },
  optionButtonText: {
    fontSize: 14,
    color: "#1A1A1A",
  },
  optionButtonTextSelected: {
    color: ORANGE,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  backButtonText: {
    color: "#6B6B6B",
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});