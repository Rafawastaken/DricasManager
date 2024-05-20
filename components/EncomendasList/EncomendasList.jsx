// React
import { useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";

// Components
import HeaderAction from "../HeaderAction/HeaderAction";
import ListCardEncomendas from "../ListCardEncomendas/ListCardEncomendas";

// Styles
import styles from "./EncomendasList.style";
import { COLORS } from "../../constants/theme";

const EncomendasList = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const encomendas = [
    {
      id: 0,
      estado: "Em preparação",
      data: "21/04/2024",
      valor: "35.45€",
      artigo: 1,
      nome: "Rafael Pimenta",
    },
    {
      id: 1,
      estado: "Reservado",
      data: "23/04/2024",
      valor: "13.45€",
      artigo: 1,
      nome: "Adriana Rocha",
    },
    {
      id: 2,
      estado: "Enviado",
      data: "29/04/2024",
      valor: "15.5€",
      artigo: 1,
      nome: "João Pimenta",
    },
  ];

  // Sort the encomendas array by the id property in descending order
  const sortedEncomendas = encomendas.slice().sort((a, b) => b.id - a.id);

  const showAllOrders = () => {
    router.push("/encomendas");
  };

  return (
    <View style={styles.container}>
      <HeaderAction
        title={"Encomendas Recentes"}
        actionTitle={"Ver todas"}
        action={showAllOrders}
      />
      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size={"large"} colors={COLORS.blue} />
        ) : (
          sortedEncomendas.map((encomenda) => (
            <ListCardEncomendas
              item={encomenda}
              key={encomenda.id}
              handleNavigate={() => router.push(`/encomendas/${encomenda.id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default EncomendasList;
