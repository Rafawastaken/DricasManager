import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Stack, useRouter } from "expo-router";

// Firebase hooks
import { fetchAll, getImageUrl } from "../../hooks/firebaseHooks";

// Components
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn/ScreenHeaderBtn";
import FlashMessages from "../../components/FlashMessages/FlashMessages";
import CustomPicker from "../../components/CustomPicker/CustomPicker";
import SelectList from "../../components/SelectList/SelectList";

// Styles
import { COLORS, SIZES } from "../../constants/theme";
import left from "../../assets/icons/left.png";
import styles from "./adicionar.styles";

const AdicionarArtigo = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ message: "", category: "" });
  const [nome, setNome] = useState("");
  const [pedras, setPedras] = useState([]);
  const [selectedPedras, setSelectedPedras] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [selectedMateriais, setSelectedMateriais] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const unsubscribePedras = fetchAll("pedras", async (data) => {
        const pedrasWithImages = await Promise.all(
          data.map(async (pedra) => ({
            ...pedra,
            imageUrl: await getImageUrl(pedra.nomeImagemEncoded),
          }))
        );
        setPedras(pedrasWithImages);
      });

      const unsubscribeMateriais = fetchAll("materiais", async (data) => {
        const materiaisWithImages = await Promise.all(
          data.map(async (material) => ({
            ...material,
            imageUrl: await getImageUrl(material.nomeImagemEncoded),
          }))
        );
        setMateriais(materiaisWithImages);
      });

      setLoading(false);

      return () => {
        unsubscribePedras();
        unsubscribeMateriais();
      };
    };

    fetchData();
  }, []);

  const handleRemovePedra = (id) => {
    setSelectedPedras((prevSelectedPedras) =>
      prevSelectedPedras.filter((pedra) => pedra.id !== id)
    );
  };

  const handleRemoveMaterial = (id) => {
    setSelectedMateriais((prevSelectedMaterial) =>
      prevSelectedMaterial.filter((pedra) => pedra.id !== id)
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

          {/* Nome do Artigo */}
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

          {/* Selecionar Pedras */}
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

          {/* Selecionar Materiais */}
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Materiais</Text>
            <View style={styles.selectWrapper}>
              <CustomPicker
                items={materiais}
                selectedValues={selectedMateriais}
                onValueChange={setSelectedMateriais}
                placeholder="Selecionar Material"
              />
            </View>
          </View>

          {/* Listas */}
          <View>
            {/* Lista Pedras */}
            {selectedPedras.length > 0 && (
              <>
                <Text style={styles.textHeaderSelected}>
                  Pedras Selecionadas
                </Text>
                <FlatList
                  data={selectedPedras}
                  renderItem={({ item }) => (
                    <SelectList
                      image={item.imageUrl}
                      name={item.nome}
                      preco={item.precoCusto}
                      handleRemove={() => handleRemovePedra(item.id)}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </>
            )}
            {/* Lista Materiais */}
            {selectedMateriais.length > 0 && (
              <>
                <Text style={styles.textHeaderSelected}>
                  Materiais Selecionados
                </Text>
                <FlatList
                  data={selectedMateriais}
                  renderItem={({ item }) => (
                    <SelectList
                      image={item.imageUrl}
                      name={item.nome}
                      preco={item.precoCusto}
                      handleRemove={() => handleRemoveMaterial(item.id)}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default AdicionarArtigo;

// -----------------------------------------------
// | Preco | _____________ | [valor material]    |
// -----------------------------------------------
