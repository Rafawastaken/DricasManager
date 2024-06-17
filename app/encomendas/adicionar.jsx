import { useState, useEffect } from "react";
import { LogBox } from "react-native";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";

// Firebase hooks
import {
  fetchAll,
  getImageUrl,
  uploadDatabase,
} from "../../hooks/firebaseHooks";

// Styles
import { COLORS, SIZES } from "../../constants/theme";
import left from "../../assets/icons/left.png";
import styles from "./adicionar.styles";

// Components
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn/ScreenHeaderBtn";
import FlashMessages from "../../components/FlashMessages/FlashMessages";
import CustomPicker from "../../components/CustomPicker/CustomPicker";
import SelectList from "../../components/SelectList/SelectList";

// Estados Encomendas
import estadosEncomendas from "./estados";

const AdicionarEncomenda = () => {
  // These are bugs from react native
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  LogBox.ignoreLogs(["initialScrollIndex"]);

  const router = useRouter();

  // Status
  const [loading, setLoading] = useState(false);

  // Artigos
  const [artigos, setArtigos] = useState([]);
  const [selectedArtigos, setSelectedArtigos] = useState([]);

  // Meta
  const [nome, setNome] = useState("");
  const [tracking, setTracking] = useState("");
  const [contacto, setContacto] = useState("");
  const [estado, setEstado] = useState(null);
  const [valorEncomenda, setValorEncomenda] = useState("");

  // Flash
  const [mensagem, setMensagem] = useState({ message: "", category: "" });

  // Get Add Date
  const orderDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns month from 0 to 11
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const generateReference = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 2; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
  };

  // Upload to firebase
  const uploadData = async () => {
    setLoading(true);

    const data = {
      nome,
      tracking,
      valorEncomenda,
      estado,
      artigos,
      contacto,
      orderDate: orderDate(),
      reference: generateReference(),
    };

    setNome("");
    setTracking("");
    setContacto("");
    setValorEncomenda("");
    setEstado([]);
    setArtigos([]);

    try {
      await uploadDatabase("encomendas", data);
      setMensagem({ message: "Encomenda Adicionada", category: "success" });
    } catch (error) {
      setMensagem({
        message: "Erro ao carregadar dados: " + error.message,
        category: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load artigos
  useEffect(() => {
    setLoading(true);

    const unsubscribeArtigos = fetchAll("artigos", async (data) => {
      const artigosWithImages = await Promise.all(
        data.map(async (artigo) => ({
          ...artigo,
          imageUrl: await getImageUrl(artigo.nomeImagemEncoded),
        }))
      );
      setArtigos(artigosWithImages);
    });

    setLoading(false);
    return () => {
      unsubscribeArtigos();
    };
  }, []);

  const handleRemoveArtigo = (id) => {
    setSelectedArtigos((prevSelectedArtigos) =>
      prevSelectedArtigos.filter((artigo) => artigo.id !== id)
    );
  };

  return (
    <ScrollView style={styles.container}>
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
          headerTitle: "Adicionar Encomenda",
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

          {/* Nome Cliente */}
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Nome</Text>
            <View style={styles.textWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Nome Cliente"
                value={nome}
                onChangeText={(text) => setNome(text)}
              />
            </View>
          </View>

          {/* Tracking */}
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Tracking</Text>
            <View style={styles.textWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Tracking"
                value={tracking}
                onChangeText={(text) => setTracking(text)}
              />
            </View>
          </View>

          {/* Valor Encomenda */}
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Valor Encomenda</Text>
            <View style={styles.textWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Valor Encomenda"
                value={valorEncomenda}
                onChangeText={(text) => setValorEncomenda(text)}
              />
            </View>
          </View>

          {/* Contacto */}
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Contacto</Text>
            <View style={styles.textWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Contacto"
                value={contacto}
                onChangeText={(text) => setContacto(text)}
              />
            </View>
          </View>

          {/* Selecionar Artigos */}
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Artigos</Text>
            <View style={styles.selectWrapper}>
              <CustomPicker
                items={artigos}
                selectedValues={selectedArtigos}
                onValueChange={setSelectedArtigos}
                placeholder={"Selecionar Artigo"}
              />
            </View>
          </View>

          {/* Lista de artigos selecionados */}
          {selectedArtigos.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.textHeaderSelected}>
                Artigos Selecionados
              </Text>
              <FlatList
                data={selectedArtigos}
                renderItem={({ item }) => (
                  <SelectList
                    image={item.imageUrl}
                    name={item.nome}
                    preco={item.preco}
                    handleRemove={() => handleRemoveArtigo(item.id)}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          )}

          {/* Estado Encomenda */}
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Estados</Text>
            <View style={styles.selectWrapper}>
              <CustomPicker
                items={estadosEncomendas}
                selectedValues={estado}
                onValueChange={setEstado}
                placeholder={"Selecionar Estado"}
                estados={true}
              />
            </View>
          </View>

          {/* Lista de estado selecionado */}
          {estado && (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.textHeaderSelected}>Estado Selecionado</Text>
              <SelectList
                name={estado.nome}
                image={estado.image}
                handleRemove={() => setEstado(null)}
                estado={true}
              />
            </View>
          )}

          {/* Form Submit */}
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
  );
};

export default AdicionarEncomenda;
