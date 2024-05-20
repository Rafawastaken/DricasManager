// React
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";

// firebase
import { getImageUrl } from "../../hooks/firebaseHooks";

// Icons
import trashIcon from "../../assets/icons/trash.png";

// Styles
import { COLORS } from "../../constants/theme";
import styles from "./DefaultListCard.style";

const DefaultListCard = ({ item, handleNavigate, handleDelete }) => {
  const [imageUri, setImageUri] = useState(null);


  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getImageUrl(item.nomeImagemEncoded); // Use getImageUrl function to fetch image URL
        setImageUri(url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };
     fetchImage();
  }, [item.nomeImagemEncoded]);

  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.container}>
      {/* Imagem */}
      {imageUri !== null && (
        <View>
          <Image source={{ uri: imageUri }} style={styles.imagem} />
        </View>
      )}

      {/* Texto Container */}
      <View style={styles.textContainer}>
        {/* Nome */}
        <View>
          <Text style={styles.nome} numberOfLines={1}>
            {item.nome}
          </Text>
        </View>

        {/* Precos */}
        <View style={styles.descriptionContainer}>
          <Text style={{ fontWeight: "bold" }}>
            Stock:{" "}
            <Text style={{ color: COLORS.primary, fontWeight: "normal" }}>
              {item.quantidade}
            </Text>
          </Text>

          {item.preco ? (
            <Text style={{ fontWeight: "bold" }}>
              Preço:{" "}
              <Text style={{ color: COLORS.primary, fontWeight: "normal" }}>
                {item.preco}€
              </Text>
            </Text>
          ) : null}
          <Text style={{ fontWeight: "bold" }}>
            Custo:{" "}
            <Text style={{ color: COLORS.primary, fontWeight: "normal" }}>
              {item.precoCusto}€
            </Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <Image source={trashIcon} style={styles.trashIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DefaultListCard;
