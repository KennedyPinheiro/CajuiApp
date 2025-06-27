import React from "react";
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type BackButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
};

const BotaoVoltar: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <MaterialIcons name="arrow-back" size={32} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4ab835be",
    borderRadius: 16,
    padding: 5,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginTop: 10,
    marginLeft: 10,
  },
  icon: {
    color: "#181717",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default BotaoVoltar;
