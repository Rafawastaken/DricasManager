import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

// Firebase hooks
import { fetchAll } from "../../hooks/firebaseHooks";

import { SIZES } from "../../constants/theme";

import DefaultListCard from "../DefaultListCard/DefaultListCard";

const ArtigosList = () => {
  const navigation = useRouter();
  const [loading, setLoading] = useState(true);
  const [artigos, setArtigos] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchAll("artigos", (data) => {
      setArtigos(data);
      setLoading(false);
    });

    // clean listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ marginTop: SIZES.medium, gap: SIZES.small }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.blue}
          style={{ marginTop: 30 }}
        />
      ) : (
        artigos.map((artigo) => (
          <DefaultListCard
            item={artigo}
            key={artigo.id}
            handleNavigate={""}
            handleDelete={""}
          />
        ))
      )}
    </View>
  );
};

export default ArtigosList;
