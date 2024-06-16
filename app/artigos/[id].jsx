import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

// Firebase
import { fetchById } from "../../hooks/firebaseHooks";

// Components
import FlashMessages from "../../components/FlashMessages/FlashMessages";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn/ScreenHeaderBtn";

// Styles
import { COLORS } from "../../constants/theme";
import styles from "./id.styles";
import left from "../../assets/icons/left.png";

const DetailsArtigoPage = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const result = await fetchById("artigos", id);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.pureWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: loading ? "Artigo" : `${data.nome}`,
          headerTitleAlign: "center",
          headerTitleStyle: { color: COLORS.blue, fontWeight: "bold" },
        }}
      />
      {error ? <FlashMessages category={"danger"} message={error} /> : null}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.blue}
          style={{ marginTop: 30 }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: data.imageUrl,
            }}
            style={styles.imageStyle}
          />

          <View style={styles.cardContainer}>
            <Text style={styles.headerTitle}>Meta Info</Text>

            <View style={styles.metaContainer}>
              <Text style={styles.metaTitle}>Quantidade: </Text>
              <Text style={styles.metaInfo}>{data.quantidade} uni.</Text>
            </View>

            <View style={styles.metaContainer}>
              <Text style={styles.metaTitle}>Preço Custo: </Text>
              <Text style={styles.metaInfo}>{data.precoCusto}€</Text>
            </View>

            <View style={styles.metaContainer}>
              <Text style={styles.metaTitle}>Preço: </Text>
              <Text style={styles.metaInfo}>{data.preco}€</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DetailsArtigoPage;
