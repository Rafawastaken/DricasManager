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

  const encomendas = [];

  return (
    <View style={styles.container}>
      <HeaderAction
        title={"Encomendas Recentes"}
        actionTitle={"Adicionar"}
        action={() => router.push("/")}
      />
      <View style={styles.cardsContainer}>
        {/* {loading ? (
          <ActivityIndicator size={"large"} colors={COLORS.blue} />
        ) : (
          sortedEncomendas.map((encomenda) => (
            <ListCardEncomendas
              item={encomenda}
              key={encomenda.id}
              handleNavigate={() => router.push(`/encomendas/${encomenda.id}`)}
            />
          ))
        )} */}
      </View>
    </View>
  );
};

export default EncomendasList;
