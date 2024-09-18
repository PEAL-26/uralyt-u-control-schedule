import { colors } from "@/styles/color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    color: colors.text,
  },
  title: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "700",
    width: "100%",
    textAlign: "center",
    marginBottom: 24,
    marginTop: 40,
  },
  content: {
    gap: 16,
    paddingBottom: 90,
    paddingTop: 16,
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: colors.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  swipeableContainer: {
    borderRadius: 8,
    backgroundColor: colors.cardBackground,
  },
  rightContainer: {
    flexDirection: "row",
  },
  leftContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: colors.danger,
  },
});
