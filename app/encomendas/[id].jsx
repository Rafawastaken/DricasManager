import { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { LogBox } from "react-native";

// CTT
import trackingCTT from "../../hooks/ctt";

// Firebase
import { fetchById, updateDocument } from "../../hooks/firebaseHooks";

// Components
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn/ScreenHeaderBtn";
import CustomPicker from "../../components/CustomPicker/CustomPicker";

// Estados Encomendas
import estadosEncomendas from "./estados";

// Styles
import { COLORS, SIZES } from "../../constants/theme";
import left from "../../assets/icons/left.png";
import styles from "./id.styles";

const EditarEncomenda = () => {
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  LogBox.ignoreLogs(["initialScrollIndex"]);

  // Encomenda ID
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState(null);
  const [contacto, setContacto] = useState("Sem Contacto");
  const [estado, setEstado] = useState(null);

  const [tracking, setTracking] = useState("");
  const [trackingEncomendaUpdate, setTrackingEncomendaUpdate] = useState({});

  const updateData = async () => {
    setLoading(true);

    const updatedData = {
      nome: nome || data.nome,
      contacto: contacto || data.contacto,
      estado: estado || data.estado,
      tracking: tracking || data.tracking,
    };

    try {
      await updateDocument("encomendas", id, updatedData);
      router.back(); // Navigate back after successful update
    } catch (error) {
      setError("Failed to update data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchById("encomendas", id);
        setData(result);
        if (result.tracking) {
          setTracking(result.tracking); // Set tracking state here
        }
        if (result.estado) {
          setEstado(result.estado); // Set estado state here
        }
        if (result.contacto) {
          setContacto(result.contacto);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after data fetching or error handling
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchTrackingData = async () => {
      if (tracking) {
        // Ensure tracking is available before fetching tracking data
        try {
          const trackingData = await trackingCTT(tracking);
          setTrackingEncomendaUpdate(trackingData);
        } catch (error) {
          console.error("Error fetching tracking data:", error);
        }
      }
    };

    fetchTrackingData();
  }, [tracking]); // Add tracking as a dependency

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.blue}
          style={{ marginTop: 30 }}
        />
      ) : (
        <>
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
              headerTitle: loading
                ? "Encomenda"
                : `Encomenda: ${data.reference}`,
              headerTitleAlign: "center",
              headerTitleStyle: { color: COLORS.blue, fontWeight: "bold" },
            }}
          />

          {trackingEncomendaUpdate.estado_encomenda ? (
            <View
              style={{
                backgroundColor: COLORS.blue,
                paddingVertical: 5,
                textAlign: "center",
                height: "1000",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ color: COLORS.pureWhite }}>
                {trackingEncomendaUpdate.estado_encomenda}
              </Text>
              <Text style={{ color: COLORS.pureWhite }}>
                {trackingEncomendaUpdate.mensagem_encomenda}
              </Text>
              {trackingEncomendaUpdate.localizacao_encomenda ? (
                <Text style={{ color: COLORS.pureWhite }}>
                  {trackingEncomendaUpdate.localizacao_encomenda}
                </Text>
              ) : null}
            </View>
          ) : (
            <View
              style={{
                backgroundColor: COLORS.blue,
                paddingVertical: 5,
                textAlign: "center",
                height: "1000",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ color: COLORS.pureWhite }}>
                Rastreamento não disponivel
              </Text>
            </View>
          )}

          {/* Nome Cliente */}
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Nome</Text>
            <View style={styles.textWrapper}>
              <TextInput
                placeholder={data.nome}
                style={styles.textInput}
                value={nome}
                onChangeText={(text) => {
                  setNome(text);
                }}
              />
            </View>
          </View>

          {/* Tracking encomenda */}
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Tracking</Text>
            <View style={styles.textWrapper}>
              <TextInput
                placeholder={data.tracking}
                style={styles.textInput}
                value={tracking}
                onChangeText={(text) => {
                  setTracking(text);
                }}
              />
            </View>
          </View>

          {/* Contacto */}
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>Contacto</Text>
            <View style={styles.textWrapper}>
              <TextInput
                placeholder={contacto}
                style={styles.textInput}
                value={contacto}
                onChangeText={(text) => {
                  setContacto(text);
                }}
              />
            </View>
          </View>

          {/* Status Encomenda */}
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

          {/* Controllers */}
          <View style={styles.formControllersContainer}>
            <TouchableOpacity
              style={styles.btnControllersContainer}
              onPress={updateData}
            >
              <Text style={styles.btnSubmit}>Atualizar</Text>
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

export default EditarEncomenda;
