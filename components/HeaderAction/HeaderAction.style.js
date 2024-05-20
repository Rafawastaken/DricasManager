// React
import { StyleSheet } from "react-native";

// Configs
import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.medium,
    color: COLORS.blue,
    fontWeight: "bold",
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.pureWhite,
    backgroundColor: COLORS.blue,
    padding: 5,
    borderRadius: 100,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default styles;
