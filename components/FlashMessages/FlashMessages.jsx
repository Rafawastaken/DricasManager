// React
import { View, Text } from "react-native";

// Styles
import { COLORS } from "../../constants/theme";

const FlashMessages = ({ category, message }) => {
  return (
    <View
      style={{
        backgroundColor: category === "danger" ? COLORS.red : COLORS.green,
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 20,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          color: COLORS.pureWhite,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default FlashMessages;
