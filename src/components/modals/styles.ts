import { colors } from "@/styles/color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: `${colors.background}90`,
  },
  container: {
    borderRadius: 12,
    backgroundColor: colors.background,
    width: "100%",
    height: "auto",
    borderWidth: 1,
    borderColor: colors.cardBackground,
  },
  content: {
    padding: 16,
    height: "auto",
    width: "100%",
    backgroundColor: colors.background,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: colors.cardBackground,
    borderBottomWidth: 1,
    padding: 16,
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 20,
    color: colors.text,
  },
  buttonPhContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  buttonPh: {
    position: "relative",
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  buttonPhText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700",
  },
  buttonSave: {
    backgroundColor: colors.primary,
    padding: 4,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  buttonSaveText: {
    color: colors.text,
    textAlign: "center",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "column",
    gap: 8,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderColor: colors.inputBorder,
    color: colors.text,
    borderRadius: 4,
    height: 32,
    paddingHorizontal: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.accent,
  },
  datetime: {
    flexDirection: "row",
    gap: 12,
  },
});
