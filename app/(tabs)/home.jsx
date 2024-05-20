// React
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useRouter, Stack } from "expo-router";

// Configs
import { COLORS, SIZES } from "../../constants/theme";

// Components
import Welcome from "../../components/Welcome/Welcome";
import CardMenu from "../../components/CardMenu/CardMenu";
import EncomendasList from "../../components/EncomendasList/EncomendasList";

// Define Home component
const HomeScreen = () => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
            marginTop: 30,
          }}
        >
          <Welcome />
        </View>
        <View
          style={{
            flex: 1,
            padding: 0,
          }}
        >
          <CardMenu />
        </View>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <EncomendasList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Export Home component
export default HomeScreen;
