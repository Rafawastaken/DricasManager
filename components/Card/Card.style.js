import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS, SHADOWS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.medium,
  },
  cardName: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.blue,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    marginLeft: 10,
  },
});

export default styles;
