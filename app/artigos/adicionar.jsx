import { useState, useEffect } from "react";
import { LogBox } from "react-native";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";

// Firebase hooks
import {
  fetchAll,
  getImageUrl,
  uploadDatabase,
  uploadMedia,
} from "../../hooks/firebaseHooks";

// Components
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn/ScreenHeaderBtn";
import FlashMessages from "../../components/FlashMessages/FlashMessages";
import CustomPicker from "../../components/CustomPicker/CustomPicker";
import SelectList from "../../components/SelectList/SelectList";

// Styles
import { COLORS, SIZES } from "../../constants/theme";
import left from "../../assets/icons/left.png";
import styles from "./adicionar.styles";

// Helpers
import pickImage from "../../utils/pickImage";

const AdicionarArtigo = () => {
  // These are bugs from react native
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  LogBox.ignoreLogs(["initialScrollIndex"]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ message: "", category: "" });

  // Meta Data
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [image, setImage] = useState(null);

  // De momento nao esta a ser usado mas poderá ser necessario:
  const [quantidade, setQuantidade] = useState(1);

  // Pedra
  const [pedras, setPedras] = useState([]);
  const [selectedPedras, setSelectedPedras] = useState([]);

  // Materiais
  const [materiais, setMateriais] = useState([]);
  const [selectedMateriais, setSelectedMateriais] = useState([]);
  const [quantidadeMaterial, setQuantidadeMaterial] = useState(1);

  // Custo
  const [precoCusto, setPrecoCusto] = useState(0);

  const uploadData = async () => {
    setLoading(true);
    setMensagem({ message: "", category: "" }); // Reset message state

    try {
      // Upload the image
      const nomeImagemEncoded = await uploadMedia(image);
      if (!nomeImagemEncoded) {
        throw new Error("Erro ao carregar imagem");
      }

      // Prepare data
      const data = {
        nome,
        selectedPedras,
        selectedMateriais,
        preco: Number(preco), // Ensure preco is a number
        nomeImagemEncoded,
        precoCusto: Number(precoCusto), // Ensure precoCusto is a number
        quantidade: Number(quantidade), // Ensure quantidade is a number
      };

      // Upload data to Firebase
      const uploadResult = await uploadDatabase("artigos", data);
      if (uploadResult !== true) {
        throw new Error("Erro ao carregar dados");
      }

      setMensagem({ message: "Upload realizado", category: "success" });

      // Reset form fields
      setNome("");
      setPreco("");
      setQuantidade(1);
      setPrecoCusto(0);
      setImage(null);
      setSelectedPedras([]);
      setSelectedMateriais([]);
    } catch (error) {
      setMensagem({ message: error.message, category: "danger" });
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    const calcularValorGastos = () => {
      let valorPedras = 0;
      let valorMateriais = 0;

      selectedPedras.forEach((pedra) => {
        valorPedras += Number(pedra.precoCusto) || 0; // Ensure precoCusto is a number
      });

      selectedMateriais.forEach((material) => {
        valorMateriais +=
          Number(material.calculoPreco) * Number(quantidadeMaterial) || 0; // Multiply calculoPreco by quantidadeMaterial
      });

      setPrecoCusto(valorPedras + valorMateriais);
    };

    calcularValorGastos();
  }, [selectedPedras, selectedMateriais, quantidadeMaterial]);

  const handleRemovePedra = (id) => {
    setSelectedPedras((prevSelectedPedras) =>
      prevSelectedPedras.filter((pedra) => pedra.id !== id)
    );
  };

  const handleRemoveMaterial = (id) => {
    setSelectedMateriais((prevSelectedMaterial) =>
      prevSelectedMaterial.filter((material) => material.id !== id)
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.pureWhite,
        width: "100%",
      }}
    >
      <ScrollView>
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
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                height: 40,
                marginBottom: 10,
              }}
            >
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

            {/* Lista Pedras */}
            {selectedPedras.length > 0 && (
              <View style={{ marginBottom: 20 }}>
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
              </View>
            )}

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

            {/* Lista Materiais */}
            {selectedMateriais.length > 0 && (
              <View style={{ marginBottom: 20 }}>
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
              </View>
            )}

            {/* Quantidade Material */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                height: 40,
                marginBottom: 10,
              }}
            >
              <Text style={styles.inputLabel}>Qnt Material</Text>
              <View style={styles.textWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Quantidade Material"
                  value={quantidadeMaterial.toString()}
                  onChangeText={(text) => setQuantidadeMaterial(Number(text))}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 18 }}>
                Preço Gastos:{" "}
                <Text style={{ fontWeight: "bold", color: COLORS.blue }}>
                  {precoCusto.toFixed(2)}€
                </Text>
              </Text>
            </View>

            {/* Price */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                height: 40,
                marginBottom: 10,
              }}
            >
              <Text style={styles.inputLabel}>Preço</Text>
              <View style={styles.textWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Preço Artigo"
                  value={preco}
                  onChangeText={(text) => setPreco(text)}
                />
              </View>
            </View>

            {/* Upload Media */}
            <TouchableOpacity
              onPress={async () => {
                const uri = await pickImage();
                setImage(uri);
              }}
            >
              {image && (
                <Image
                  style={{
                    width: "auto",
                    height: 300,
                    borderRadius: SIZES.medium,
                    marginLeft: 10,
                    marginRight: 20,
                    marginTop: 10,
                  }}
                  source={{ uri: image }}
                />
              )}
              <Text style={styles.btnUploadImage}>Escolher Imagem</Text>
            </TouchableOpacity>

            {/* Actions */}
            <View style={styles.formControllersContainer}>
              <TouchableOpacity
                style={styles.btnControllersContainer}
                onPress={uploadData}
              >
                <Text style={styles.btnSubmit}>Carregar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnControllersContainer}
                onPress={() => router.back()}
              >
                <Text style={styles.btnGoBack}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdicionarArtigo;
