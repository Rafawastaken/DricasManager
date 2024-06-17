// React
import { Text, View, TouchableOpacity } from "react-native";

// Styles
import styles from "./Welcome.style";
import { COLORS } from "../../constants/theme";

const Welcome = ({ aguardarPagamento, preparacao }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Olá Adriana</Text>

      <TouchableOpacity handlePress={() => {}} style={styles.ordersTextButton}>
        <Text style={styles.ordersStatusText}>{preparacao} Encomendas </Text>
        <Text style={styles.ordersPayed}>Por Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        handlePress={() => {}}
        style={styles.ordersTextButtonNoMargin}
      >
        <Text style={styles.ordersStatusText}>
          {aguardarPagamento} Encomendas{" "}
        </Text>
        <Text style={styles.ordersWaitingPayment}>Aguardar Pagamento</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
