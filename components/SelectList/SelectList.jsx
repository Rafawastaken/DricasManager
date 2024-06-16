import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

// Icons
import trashIcon from "../../assets/icons/trash.png";

import styles from "./SelectList.style";

const SelectList = ({ image, name, preco, handleRemove, estado = false }) => {
  return (
    <View style={styles.container}>
      {estado ? (
        <>
          <Image style={styles.image} source={image} />
          <Text style={{ fontSize: 18 }}>{name}</Text>
        </>
      ) : (
        <>
          <Image style={styles.image} source={{ uri: image }} />
          <Text style={{ fontSize: 18 }}>
            {name} - {preco}€
          </Text>
        </>
      )}
      <TouchableOpacity onPress={handleRemove}>
        <Image source={trashIcon} style={styles.remove} />
      </TouchableOpacity>
    </View>
  );
};

export default SelectList;
