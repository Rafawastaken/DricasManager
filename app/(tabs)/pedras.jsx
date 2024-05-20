// React
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { useRouter, Stack } from "expo-router";
import { useState, useEffect } from "react";

// Configs
import { COLORS, SIZES } from "../../constants/theme";

// Components
import HeaderAction from "../../components/HeaderAction/HeaderAction";
import PedrasList from "../../components/PedrasList/PedrasList";

const PedrasIndex = () => {
  const router = useRouter();

  const adicionarPedra = () => {
    router.push("/pedras/adicionar");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.pureWhite }}>
      {/* Adicionar goback icon */}
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackTitleVisible: true,
          headerShown: false,
        }}
      />
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
          marginTop: 30,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderAction
            title={"Pedras Disponíveis"}
            actionTitle={"Adicionar"}
            action={adicionarPedra}
          />
          <PedrasList />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PedrasIndex;
