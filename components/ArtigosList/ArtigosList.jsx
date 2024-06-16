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

const ArtigosList = () => {
  const router = useRouter();
  const [artigos, setArtigos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pedras
  useEffect(() => {
    const unsubscribe = fetchAll("artigos", setArtigos);
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
      ) : artigos ? (
        artigos.map((artigo) => (
          <DefaultListCard
            item={artigo}
            key={artigo.id}
            handleNavigate={() => {
              router.push(`/artigos/${artigo.id}`);
            }}
            handleDelete={() => {
              deleteItem("artigos", artigo.id, artigo.nomeImagemEncoded);
            }}
          />
        ))
      ) : (
        <View>
          <Text>Sem artigos adicionadas</Text>
        </View>
      )}
    </View>
  );
};

export default ArtigosList;
