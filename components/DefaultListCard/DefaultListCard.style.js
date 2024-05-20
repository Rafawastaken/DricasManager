import { StyleSheet } from "react-native";
import { FONT, SIZES, COLORS, SHADOWS } from "../../constants/theme";

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
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    textAlign: "start",
    gap: 5,
  },

  nome: {
    fontSize: 18,
    color: COLORS.blue,
    textTransform: "capitalize",
    fontWeight: "bold",
  },

  descriptionContainer: {
    flex: 1,
    flexDirection: "row",
    fontSize: SIZES.medium,
  },

  quantidade: {
    marginTop: 3,
    marginBottom: 3,
  },

  imagem: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },

  trashIcon: {
    width: 30,
    height: 30,
  },

  descriptionContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
});

export default styles;
