import { colors } from "@/styles/color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: colors.cardBackground,
    justifyContent: "space-between",
    borderRadius: 8,
    flexDirection: "row",
    gap: 16,
  },
  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  right: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    justifyContent: "flex-end",
  },
  phContainer: {
    width: 40,
    height: 40,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  phText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  descriptionContainer: {
    flexDirection: "column",
    gap: 8,
  },
  date: {
    color: colors.accent,
    fontSize: 12,
  },
  spoons: {
    color: colors.text,
    fontSize: 14,
  },
  statusDisplay: {
    flex: 1,
    color: colors.text,
    fontSize: 12,
    textAlign: "right",
  },
});
