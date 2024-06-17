// React
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";

// Components
import HeaderAction from "../HeaderAction/HeaderAction";
import ListCardEncomendas from "../ListCardEncomendas/ListCardEncomendas";

// Styles
import styles from "./EncomendasList.style";
import { COLORS } from "../../constants/theme";

// Firebase
import { fetchAll } from "../../hooks/firebaseHooks";

const EncomendasList = ({ encomendas }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <HeaderAction
        title={"Encomendas Recentes"}
        actionTitle={"Adicionar"}
        action={() => router.push("/encomendas/adicionar")}
      />
      <View style={styles.cardsContainer}>
        {encomendas.map((encomenda) => (
          <ListCardEncomendas
            item={encomenda}
            key={encomenda.id}
            handleNavigate={() => router.push(`/encomendas/${encomenda.id}`)}
          />
        ))}
      </View>
    </View>
  );
};

export default EncomendasList;
