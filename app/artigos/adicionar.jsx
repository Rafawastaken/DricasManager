import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Stack, useRouter } from "expo-router";

// Firebase hooks
import { fetchAll, getImageUrl } from "../../hooks/firebaseHooks";

// Components
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn/ScreenHeaderBtn";
import FlashMessages from "../../components/FlashMessages/FlashMessages";
import CustomPicker from "../../components/CustomPicker/CustomPicker";

// Styles
import { COLORS } from "../../constants/theme";
import left from "../../assets/icons/left.png";
import styles from "./adicionar.styles";

const AdicionarArtigo = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ message: "", category: "" });
  const [nome, setNome] = useState("");
  const [pedras, setPedras] = useState([]);
  const [selectedPedras, setSelectedPedras] = useState([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribePedras = fetchAll("pedras", async (data) => {
      const pedrasWithImages = await Promise.all(
        data.map(async (pedra) => ({
          ...pedra,
          imageUrl: await getImageUrl(pedra.nomeImagemEncoded),
        }))
      );
      setPedras(pedrasWithImages);
      setLoading(false);
    });
    return () => unsubscribePedras();
  }, []);

  const handleRemovePedra = (id) => {
    setSelectedPedras((prevSelectedPedras) =>
      prevSelectedPedras.filter((pedra) => pedra.id !== id)
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, padding: 10, backgroundColor: COLORS.pureWhite }}
    >
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
          headerTitle: "Adicionar Artigo",
          headerTitleAlign: "center",
          headerTitleStyle: { color: COLORS.blue, fontWeight: "bold" },
        }}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.blue}
          style={{ marginTop: 30 }}
        />
      ) : (
        <>
          {mensagem.message && (
            <FlashMessages
              message={mensagem.message}
              category={mensagem.category}
            />
          )}

          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Nome</Text>
            <View style={styles.textWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Nome Artigo"
                value={nome}
                onChangeText={(text) => setNome(text)}
              />
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Pedra</Text>
            <View style={styles.selectWrapper}>
              <CustomPicker
                items={pedras}
                selectedValues={selectedPedras}
                onValueChange={setSelectedPedras}
                placeholder="Selecionar Pedra"
              />
            </View>
          </View>

          {selectedPedras.length > 0
            ? selectedPedras.map((pedra) => (
                <View key={pedra.id}>
                  <Text>{pedra.nome}</Text>
                  <TouchableOpacity onPress={() => handleRemovePedra(pedra.id)}>
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
              ))
            : null}
        </>
      )}
    </SafeAreaView>
  );
};

export default AdicionarArtigo;
