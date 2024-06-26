// React
import { View, Text, TouchableOpacity, Image } from "react-native";

// Styles
import styles from "./ListCardEncomendas.style";

// Icons
import completedIcon from "../../assets/icons/completed.png";
import waitingIcon from "../../assets/icons/wait.png";
import workingIcon from "../../assets/icons/working.png";

const ListCardEncomendas = ({ item, handleNavigate }) => {
  let icon = "";

  // Aguardar Pagamento
  // Em preparação
  // Enviado

  switch (item.estado.id) {
    case 0:
      icon = waitingIcon;
      break;
    case 1:
      icon = workingIcon;
      break;
    case 2:
      icon = completedIcon;
      break;
  }

  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.container}>
      <TouchableOpacity onPress={handleNavigate} style={styles.refBackground}>
        <Text style={styles.refEncomenda}>{item.reference}</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.nome} numberOfLines={1}>
          Encomenda de <Text style={{ fontWeight: "bold" }}>{item.nome}</Text>
        </Text>

        <Text styles={styles.data}>
          {item.orderDate} - {item.preco}€
        </Text>

        <Text style={styles.nome} numberOfLines={1}>
          {item.estado.nome}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={icon} />
      </View>
    </TouchableOpacity>
  );
};

export default ListCardEncomendas;
