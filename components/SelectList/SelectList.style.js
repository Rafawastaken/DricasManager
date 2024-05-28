import { StyleSheet } from "react-native";
import { SIZES, COLORS, SHADOWS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    backgroundColor: COLORS.white,
    width: "100%",
    marginTop: 10,
  },
  image: { height: 40, width: 40, borderRadius: 50 },
  remove: { width: 25, height: 25 },
});

export default styles;
