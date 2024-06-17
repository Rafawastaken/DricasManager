// React
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  ScrollView,
  Text,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useState, useEffect } from "react";

// Configs
import { COLORS, SIZES } from "../../constants/theme";

// Components
import EncomendasList from "../../components/EncomendasList/EncomendasList";

// Firebase
import { fetchAll } from "../../hooks/firebaseHooks";

const ListaEncomendas = () => {
  const [loading, setLoading] = useState(false);
  const [encomendas, setEncomendas] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchAll("encomendas", setEncomendas);
    setLoading(false);
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.pureWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackTitleVisible: true,
          headerShown: false,
        }}
      />
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
          marginTop: 30,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator
              size={"large"}
              colors={COLORS.blue}
              style={{ marginTop: 30 }}
            />
          ) : (
            <EncomendasList encomendas={encomendas} />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ListaEncomendas;
