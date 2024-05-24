import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // Necessario colocar fundo pureWhite
  },

  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 40,
    marginBottom: 10,
  },

  textWrapper: {
    height: "100%",
    width: "60%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
  },

  selectWrapper: {
    height: "100%",
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    borderColor: COLORS.gray,
  },

  picker: {
    width: "90%",
    height: "100%",
    textAlign: "center",
    color: COLORS.black,
  },

  textInput: {
    width: "90%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    fontSize: 16,
    textAlign: "start",
  },

  inputLabel: {
    textAlign: "center",
    height: "auto",
    width: 150,
    padding: 10,
    marginRight: 10,
    alignSelf: "center",
    justifyContent: "center", // This is for horizontal centering
    backgroundColor: COLORS.blue,
    borderRadius: SIZES.medium,
    color: "white",
    fontSize: 16,
  },

  btnUploadImage: {
    color: COLORS.blue,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    backgroundColor: COLORS.white,
    height: 40,
    borderRadius: SIZES.medium,
    borderColor: COLORS.blue,
    borderWidth: 1,
    marginTop: 10,
  },

  formControllersContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 5,
    marginTop: 20,
  },

  btnControllersContainer: {
    width: "50%",
    height: 40,
  },
  btnGoBack: {
    backgroundColor: COLORS.gray,
    height: 30,
    color: COLORS.white,
    width: "100%",
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: SIZES.small,
    fontSize: 16,
  },
  btnSubmit: {
    backgroundColor: COLORS.green,
    height: 30,
    color: COLORS.white,
    width: "100%",
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: SIZES.small,
    fontSize: 16,
  },

  calculoContainer: {
    backgroundColor: COLORS.blue,
    borderRadius: SIZES.medium,
    padding: SIZES.xSmall,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  calculoLabel: {
    color: COLORS.pureWhite,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
