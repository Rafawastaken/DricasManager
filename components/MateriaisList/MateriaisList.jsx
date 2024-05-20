// React
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

// Styles
import { SIZES, COLORS } from "../../constants/theme"; // Make sure COLORS is imported

// Firebase hooks
import { fetchAll } from "../../hooks/firebaseHooks";

// Components
import DefaultListCard from "../DefaultListCard/DefaultListCard";

const MateriaisList = () => {
  const navigation = useRouter();
  const [loading, setLoading] = useState(true);
  const [materiais, setMateriais] = useState([]);

  // fetch materiais
  useEffect(() => {
    const unsubscribe = fetchAll("materiais", (data) => {
      setMateriais(data);
      setLoading(false);
    });

    // Clean up listener on unmount
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
        materiais.map((material) => (
          <DefaultListCard
            item={material}
            key={material.id}
            handleNavigate={() => {
              navigation.push(`/materiais/${material.id}`);
            }}
            handleDelete={() => {
              navigation.push(`/materiais/apagar/${material.id}`);
            }}
          />
        ))
      )}
    </View>
  );
};

export default MateriaisList;
