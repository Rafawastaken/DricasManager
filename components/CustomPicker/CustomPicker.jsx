import React from "react";
import { View, Text, Image } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import styles from "./CustomPicker.style";

const CustomPicker = ({
  items,
  selectedValues,
  onValueChange,
  placeholder,
  estados = false,
}) => {
  const renderRow = (option, index, isSelected) => (
    <View style={[styles.row, isSelected && styles.selectedRow]}>
      {!estados ? (
        <>
          <Image source={{ uri: option.imageUrl }} style={styles.image} />
          <Text style={styles.text}>
            {option.nome} - {option.precoCusto}€
          </Text>
        </>
      ) : (
        <>
          <Image source={option.image} style={styles.image} />
          <Text style={styles.text}>{option.nome}</Text>
        </>
      )}
    </View>
  );

  const handleSelect = (index) => {
    const selectedItem = items[index];
    if (estados) {
      // For estados, select only one value
      onValueChange(selectedItem);
    } else {
      // Append the selected item to the list for multiple selections
      const newSelectedValues = [...selectedValues, selectedItem];
      onValueChange(newSelectedValues);
    }
  };

  return (
    <View style={{ width: "90%" }}>
      <ModalDropdown
        options={items.map((item) =>
          estados ? item.nome : `${item.nome} - ${item.precoCusto}€`
        )}
        renderRow={(option, index, isSelected) =>
          renderRow(items[index], index, isSelected)
        }
        onSelect={(index) => handleSelect(index)}
        defaultValue={
          estados
            ? selectedValues?.nome || placeholder
            : selectedValues.length > 0
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
