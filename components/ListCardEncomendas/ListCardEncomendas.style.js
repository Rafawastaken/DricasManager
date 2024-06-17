import { StyleSheet } from "react-native";
import { FONT, SIZES, COLORS, SHADOWS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    backgroundColor: COLORS.white,
  },
  refBackground: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0, // Add padding to create some space around the text
    backgroundColor: COLORS.white,
    borderRadius: 100, // Make it a circle
  },
  refEncomenda: {
    backgroundColor: COLORS.blue,
    color: COLORS.white,
    width: 70,
    textAlign: "center",
    paddingHorizontal: 5, // Adjust padding to your preference
    paddingVertical: 10, // Adjust padding to your preference
    borderRadius: 100, // Make it a circle
    // fontWeight: "bold",
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  nome: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  data: {
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },

  icon: {
    height: 40,
    width: 40,
  },
});

export default styles;
