import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Card.style";

const Card = ({ props, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleCardPress(props)}
    >
      <TouchableOpacity
        onPress={() => handleCardPress(props)}
        style={styles.imageContainer}
      >
        <Image
          source={props.image}
          resizeMode="contain"
          style={styles.cardImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleCardPress(props)}
        style={styles.infoContainer}
      >
        <Text style={styles.cardName} numberOfLines={1}>
          {props.title}
        </Text>
        <View>
          <Text style={styles.cardDescription} numberOfLines={1}>
            {props.description}
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Card;
