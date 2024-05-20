// React
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  ScrollView,
  Text,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useState } from "react";

// Configs
import { COLORS, SIZES } from "../../constants/theme";

// Components
import EncomendasList from "../../components/EncomendasList/EncomendasList";

const ListaMateriais = () => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.pureWhite }}>
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
          {loading ? (
            <ActivityIndicator
              size={"large"}
              colors={COLORS.blue}
              style={{ marginTop: 30 }}
            />
          ) : (
            <EncomendasList />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ListaMateriais;
