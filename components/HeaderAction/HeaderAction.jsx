// React
import { View, TouchableOpacity, Text } from "react-native";

// Styles
import styles from "./HeaderAction.style";

const HeaderAction = ({ action, actionTitle, title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.headerBtn} onPress={action}>
          {actionTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderAction;
