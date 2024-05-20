import { StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.pureWhite,
  },
  imageStyle: {
    textAlign: "center",
    alignSelf: "center",
    justifySelf: "center",
    width: 343,
    height: 343,
    marginBottom: 20,
    borderRadius: SIZES.medium,
    marginHorizontal: 15,
  },

  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    padding: 10,
  },

  headerTitle: {
    textAlign: "start",
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.darkGray,
  },
  metaContainer: { display: "flex", flexDirection: "row" },
  metaTitle: {
    fontWeight: "bold",
    fontSize: SIZES.large,
    color: COLORS.blue,
    marginBottom: 5,
  },
  metaInfo: { fontSize: SIZES.large },
});

export default styles;
