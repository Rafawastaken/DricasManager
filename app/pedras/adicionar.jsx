import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter } from "expo-router";

// Firebase
import { uploadDatabase, uploadMedia } from "../../hooks/firebaseHooks";

// Utils
import pickImage from "../../utils/pickImage";

// Components
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn/ScreenHeaderBtn";
import FlashMessages from "../../components/FlashMessages/FlashMessages";

// Styles
import { COLORS, SIZES } from "../../constants/theme";
import styles from "./adicionar.styles";
import left from "../../assets/icons/left.png";

const AdicionarPedra = () => {
  const router = useRouter();

  // Inputs
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoCusto, setPrecoCusto] = useState("");
  const [image, setImage] = useState("");
  const [mensagem, setMensagem] = useState({
    message: "",
    category: "",
  });

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
      precoCusto,
      quantidade,
      nomeImagemEncoded,
    };

    try {
      await uploadDatabase("pedras", data);
      setMensagem({
        message: "Upload realizado",
        category: "success",
      });
    } catch (error) {
      setMensagem({
        message: "Erro ao carregar dados: " + error.message,
        category: "danger",
      });
    } finally {
      setNome("");
      setQuantidade("");
      setPrecoCusto("");
      setImage("");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, padding: 10, backgroundColor: COLORS.pureWhite }}
    >
      {/* Header */}
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
          headerTitle: "Adicionar Pedra",
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
          {/* Flash Status */}
          {mensagem.message && (
            <FlashMessages
              message={mensagem.message}
              category={mensagem.category}
            />
          )}

          {/* Meta DATA */}
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Nome</Text>
            <View style={styles.textWrapper}>
              <TextInput
                placeholder="Nome da Pedra"
                style={styles.textInput}
                value={nome}
                onChangeText={(text) => setNome(text)}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Quantidade</Text>
            <View style={styles.textWrapper}>
              <TextInput
                keyboardType="numeric"
                placeholder="Quantidade"
                style={styles.textInput}
                value={quantidade}
                onChangeText={(text) => setQuantidade(text)}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Preço Custo</Text>
            <View style={styles.textWrapper}>
              <TextInput
                placeholder="Preço de Custo"
                style={styles.textInput}
                value={precoCusto}
                onChangeText={(text) => setPrecoCusto(text)}
              />
            </View>
          </View>

          {/* Upload Image */}
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
    </SafeAreaView>
  );
};

export default AdicionarPedra;
