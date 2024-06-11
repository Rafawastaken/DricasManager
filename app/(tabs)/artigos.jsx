// React
import { SafeAreaView, View, ScrollView, Text } from "react-native";
import { useRouter, Stack } from "expo-router";
import { useState } from "react";

// Configs
import { COLORS, SIZES } from "../../constants/theme";
import HeaderAction from "../../components/HeaderAction/HeaderAction";

// Components
import ArtigosList from "../../components/ArtigosList/ArtigosList";

const ListaMateriais = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const adicionarMaterial = () => {
    router.push("/artigos/adicionar");
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
            title={"Artigos Disponíveis"}
            actionTitle={"Adicionar"}
            action={adicionarMaterial}
          />
          <ArtigosList />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ListaMateriais;
