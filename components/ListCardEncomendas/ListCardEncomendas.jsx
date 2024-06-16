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

  switch (item.estado) {
    case "Enviado":
      icon = completedIcon;
      break;
    case "Em preparação":
      icon = workingIcon;
      break;
    case "Aguardar Pagamento":
      icon = waitingIcon;
      break;
  }

  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.container}>
      <TouchableOpacity onPress={handleNavigate} style={styles.refBackground}>
        <Text style={styles.refEncomenda}>{item.id + 1}</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.nome} numberOfLines={1}>
          Encomenda de <Text style={{ fontWeight: "bold" }}>{item.nome}</Text>
        </Text>
        <Text styles={styles.data}>{item.data} </Text>
      </View>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={icon} />
      </View>
    </TouchableOpacity>
  );
};

export default ListCardEncomendas;
