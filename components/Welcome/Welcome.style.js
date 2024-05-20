import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "start",
  },
  welcomeText: {
    fontSize: SIZES.xLarge,
    color: COLORS.blue,
    fontWeight: "bold",
  },
  ordersStatusText: {
    fontSize: SIZES.medium,
  },
  ordersWaitingPayment: {
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    fontWeight: "bold",
  },
  ordersPayed: {
    fontSize: SIZES.medium,
    color: COLORS.green,
    fontWeight: "bold",
  },
  ordersTextButton: {
    flexDirection: "row",
    fontSize: SIZES.medium,
    alignItems: "center",
    marginBottom: 3,
  },
  ordersTextButtonNoMargin: {
    flexDirection: "row",
    fontSize: SIZES.medium,
    alignItems: "center",
  },
});

export default styles;
