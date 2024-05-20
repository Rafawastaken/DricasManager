import React from "react";
import { Tabs } from "expo-router";
import { Image } from "react-native";

// Icons
import HomeIcon from "../../assets/icons/home.png";
import PedrasIcon from "../../assets/icons/pedras.png";
import MaterialIcon from "../../assets/icons/materiais.png";
import EncomendasIcon from "../../assets/icons/encomendas.png";
import ArtigosIcon from "../../assets/icons/artigos.png";

const MyTabsComponent = () => {
  const renderIcon = (iconSource) => (
    <Image source={iconSource} style={{ height: 25, width: 25 }} />
  );

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => renderIcon(HomeIcon),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="pedras"
        options={{
          tabBarIcon: () => renderIcon(PedrasIcon),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="materiais"
        options={{
          tabBarIcon: () => renderIcon(MaterialIcon),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="artigos"
        options={{
          tabBarIcon: () => renderIcon(ArtigosIcon),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="encomendas"
        options={{
          tabBarIcon: () => renderIcon(EncomendasIcon),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
};

export default MyTabsComponent;
