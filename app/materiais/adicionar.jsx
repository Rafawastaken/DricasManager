import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Stack, useRouter } from "expo-router";
import { useState, useEffect } from "react";

// Firebase
import { uploadDatabase, uploadMedia } from "../../hooks/firebaseHooks";

// Utils
import pickImage from "../../utils/pickImage";

// Components
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn/ScreenHeaderBtn";
import FlashMessages from "../../components/FlashMessages/FlashMessages";

// styles
import { COLORS, SIZES } from "../../constants/theme";
import left from "../../assets/icons/left.png";
import style from "./adicionar.styles";
import styles from "../pedras/adicionar.styles";

const AdicionarMaterial = () => {
  const router = useRouter();

  // useStates
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [precoCusto, setPrecoCusto] = useState("");
  const [image, setImage] = useState("");
  const [unidade, setUnidade] = useState("");
  const [calculoPreco, setCalculoPreco] = useState(null);
  const [mensagem, setMensagem] = useState({ message: "", category: "" });

  const uploadData = async () => {
    setLoading(true);
    const nomeImagemEncoded = await uploadMedia(image);

    if (!nomeImagemEncoded) {
      setMensagem({
        message: "Erro ao carregar imagem",
        category: "danger",
      });
      setLoading(false);
      return;
    }

    const data = {
      nome,
      quantidade,
      precoCusto,
      unidade,
      calculoPreco,
      nomeImagemEncoded,
    };

    try {
      await uploadDatabase("materiais", data);
      setMensagem({ message: "Upload Realizado", category: "success" });
    } catch (error) {
      setMensagem({
        message: "Erro ao carregadar dados: " + error.message,
        category: "danger",
      });
    } finally {
      setNome("");
      setQuantidade("");
      setPrecoCusto("");
      setImage("");
      setUnidade("");
      setCalculoPreco("");
      setLoading(false);
    }
  };

  // Calculate price per unit
  useEffect(() => {
    if (unidade && precoCusto && quantidade) {
      const preco = parseFloat(precoCusto) / parseFloat(quantidade);
      setCalculoPreco(preco.toFixed(2));
    } else {
      setCalculoPreco(null);
    }
  }, [precoCusto, quantidade, unidade]);

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
          headerTitle: "Adicionar Material",
          headerTitleAlign: "center",
          headerTitleStyle: { color: COLORS.blue, fontWeight: "bold" },
        }}
      />

      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={COLORS.blue}
          style={{ marginTop: 30 }}
        />
      ) : (
        <>
          {/* Flash Messages */}
          {mensagem.message && (
            <FlashMessages
              message={mensagem.message}
              category={mensagem.category}
            />
          )}

          {/* Meta Data */}

          {/* Nome */}
          <View style={style.textContainer}>
            <Text style={style.inputLabel}>Nome</Text>
            <View style={style.textWrapper}>
              <TextInput
                style={style.textInput}
                placeholder="Nome Material"
                value={nome}
                onChangeText={(text) => setNome(text)}
              />
            </View>
          </View>

          {/* Unidade */}
          <View style={style.textContainer}>
            <Text style={style.inputLabel}>Unidade:</Text>
            <View style={style.selectWrapper}>
              <Picker
                selectedValue={unidade}
                style={style.picker}
                onValueChange={(itemValue, itemIndex) => setUnidade(itemValue)}
              >
                <Picker.Item label="Peso (g)" value="g" />
                <Picker.Item label="Tamanho (m)" value="m" />
                <Picker.Item label="Unidade: (uni)" value="uni" />
              </Picker>
            </View>
          </View>

          {/* Quantidade */}
          <View style={style.textContainer}>
            <Text style={style.inputLabel}>Quantidade</Text>
            <View style={style.textWrapper}>
              <TextInput
                style={style.textInput}
                placeholder="Quantidade"
                value={quantidade}
                editable={unidade !== ""}
                onChangeText={(text) => setQuantidade(text)}
              />
            </View>
          </View>

          {/* Preco Custo */}
          <View style={style.textContainer}>
            <Text style={style.inputLabel}>Preço Custo</Text>
            <View style={style.textWrapper}>
              <TextInput
                style={style.textInput}
                placeholder="Preço Custo"
                value={precoCusto}
                onChangeText={(text) => setPrecoCusto(text)}
              />
            </View>
          </View>

          {/*Calculo Preco*/}
          {calculoPreco && (
            <View style={style.calculoContainer}>
              <Text style={style.calculoLabel}>
                Preço por{" "}
                {unidade === "m"
                  ? "metro"
                  : unidade === "g"
                  ? "grama"
                  : "unidade"}
                : {calculoPreco}€
              </Text>
            </View>
          )}

          {/*Upload Image*/}
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
                }}
                source={{ uri: image }}
              />
            )}
            <Text style={styles.btnUploadImage}>Escolher Imagem</Text>
          </TouchableOpacity>

          {/*Form Submit*/}
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
    </SafeAreaView>
  );
};

export default AdicionarMaterial;
