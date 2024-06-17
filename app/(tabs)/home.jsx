// React
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { useRouter, Stack } from "expo-router";

// Configs
import { COLORS, SIZES } from "../../constants/theme";

// Components
import Welcome from "../../components/Welcome/Welcome";
import CardMenu from "../../components/CardMenu/CardMenu";
import EncomendasList from "../../components/EncomendasList/EncomendasList";

// Firebase
import { fetchAll } from "../../hooks/firebaseHooks";

// Define Home component
const HomeScreen = () => {
  const [encomendas, setEncomendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preparacao, setPreparacao] = useState(0);
  const [aguardarPagamento, setAguardarPagamento] = useState(0);

  useEffect(() => {
    const unsubscribe = fetchAll("encomendas", setEncomendas);
    setLoading(false);
    return () => unsubscribe();
  }, []);

  // Verificar encomendas Preparacao e Aguardar pagamento
  useEffect(() => {
    // Count orders with estado.id == 1 -> Preparacao
    const countPreparacao = encomendas.filter(
      (encomenda) => encomenda.estado.id === 1
    ).length;
    setPreparacao(countPreparacao);

    // Count orders with estado.id == 0 -> Aguardar Pagamento
    const countAguardarPagamento = encomendas.filter(
      (encomenda) => encomenda.estado.id === 0
    ).length;
    setAguardarPagamento(countAguardarPagamento);
  }, [encomendas]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.pureWhite }}>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          colors={COLORS.blue}
          style={{ marginTop: 30 }}
        />
      ) : (
        <>
          <Stack.Screen
            options={{
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,
              headerBackTitleVisible: true,
              headerShown: false,
            }}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                padding: SIZES.medium,
                marginTop: 30,
              }}
            >
              <Welcome
                aguardarPagamento={aguardarPagamento}
                preparacao={preparacao}
              />
            </View>
            <View
              style={{
                flex: 1,
                padding: 0,
              }}
            >
              <CardMenu />
            </View>
            <View
              style={{
                flex: 1,
                padding: SIZES.medium,
              }}
            >
              <EncomendasList encomendas={encomendas} />
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

// Export Home component
export default HomeScreen;
