// React
import { View, ActivityIndicator, Text } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

// Firebase
import { fetchAll, deleteItem } from "../../hooks/firebaseHooks";

// Styles
import { SIZES, COLORS } from "../../constants/theme";

// Components
import DefaultListCard from "../DefaultListCard/DefaultListCard";

const PedrasList = () => {
  const navigation = useRouter();
  const [pedras, setPedras] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pedras
  useEffect(() => {
    const unsubscribe = fetchAll("pedras", setPedras);
    setLoading(false);
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ marginTop: SIZES.medium, gap: SIZES.small }}>
      {loading ? ( // Show loading indicator while data is being fetched
        <ActivityIndicator
          size={"large"}
          colors={COLORS.blue}
          style={{ marginTop: 30 }}
        />
      ) : pedras ? (
        pedras.map((pedra) => (
          <DefaultListCard
            item={pedra}
            key={pedra.id}
            handleNavigate={() => {
              navigation.push(`/pedras/${pedra.id}`);
            }}
            handleDelete={() => {
              deleteItem("pedras", pedra.id, pedra.nomeImagemEncoded);
            }}
          />
        ))
      ) : (
        <View>
          <Text>Sem pedras adicionadas</Text>
        </View>
      )}
    </View>
  );
};

export default PedrasList;
