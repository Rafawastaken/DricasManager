import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./CustomPicker.style";
import ModalDropdown from "react-native-modal-dropdown";

const CustomPicker = ({
  items,
  selectedValues,
  onValueChange,
  placeholder,
}) => {
  const renderRow = (option, index, isSelected) => (
    <View style={[styles.row, isSelected && styles.selectedRow]}>
      <Image source={{ uri: option.imageUrl }} style={styles.image} />
      <Text style={styles.text}>
        {option.nome} - {option.precoCusto}€
      </Text>
    </View>
  );

  const handleSelect = (index) => {
    const selectedItem = items[index];
    // Append the selected item to the list
    const newSelectedValues = [...selectedValues, selectedItem];
    onValueChange(newSelectedValues);
  };

  return (
    <View style={{ width: "90%" }}>
      <ModalDropdown
        options={items.map((pedra) => `${pedra.nome} - ${pedra.precoCusto}€`)}
        renderRow={(option, index, isSelected) =>
          renderRow(items[index], index, isSelected)
        }
        onSelect={(index) => handleSelect(index)}
        defaultValue={
          selectedValues.length > 0
            ? selectedValues.map((item) => item.nome).join(", ")
            : placeholder
        }
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownStyle}
        style={styles.dropdown}
        dropdownTextStyle={styles.dropdownTextStyle}
      />
    </View>
  );
};

export default CustomPicker;
