// react
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ActivityIndicatorComponent,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Stack, useRouter } from "expo-router";
import { useState, useEffect } from "react";

// Firebase
import { uploadDatabase, uploadMedia } from "../../hooks/firebaseHooks";

// Components
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn/ScreenHeaderBtn";
import FlashMessages from "../../components/FlashMessages/FlashMessages";

// Styles
import { COLORS, SIZES } from "../../constants/theme";
import left from "../../assets/icons/left.png";
import style from "./adicionar.styles";
import styles from "../pedras/adicionar.styles";

const AdicionarArtigo = () => {
  const router = useRouter();

  // States
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ message: "", category: "" });
  const [nome, setNome] = useState("");
  const [materiasUsados, setMateriaisUsados] = useState([]);

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
          size={"large"}
          color={COLORS.blue}
          style={{ marginTop: 30 }}
        />
      ) : (
        <>
          {/*Flash Messages*/}
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
                placeholder="Nome Artigo"
                value={nome}
                onChangeText={(text) => setNome(text)}
              />
            </View>
          </View>

          {/* Materiais Usados */}
        </>
      )}
    </SafeAreaView>
  );
};

export default AdicionarArtigo;
