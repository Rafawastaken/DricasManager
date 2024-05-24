import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  selectedRow: {
    backgroundColor: "#e6f7ff",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  dropdown: {
    borderRadius: 5,
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownStyle: {
    width: "90%", // or any other width you desire
    position: "absolute",
    marginLeft: "-43%", // half of the width to center horizontally
    marginTop: -10, // adjust this value according to your dropdown's height
  },
  dropdownTextStyle: {
    fontSize: 16,
    lineHeight: 30,
  },
});

export default styles;
