// React
import { View, Text, FlatList } from "react-native";
import { useRouter } from "expo-router";

// Styles
import styles from "./CardMenu.style";
import { SIZES } from "../../constants/theme";

// Components
import Card from "../Card/Card";

// Menu Data
import CardMenuItems from "./CardMenuItems";

const CardMenu = () => {
  const router = useRouter();

  const handleCardPress = (item) => {
    router.push(item.action);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Acesso Rápido</Text>
      </View>

      <View styles={styles.cardsContainer}>
        <FlatList
          data={CardMenuItems}
          renderItem={({ item }) => (
            <Card props={item} handleCardPress={handleCardPress} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    </View>
  );
};

export default CardMenu;
