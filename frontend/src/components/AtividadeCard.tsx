import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type Props = {
  titulo: string;
  maxPontos: number;
  onPress?: () => void;
};

const AtividadeCard = ({ titulo, maxPontos, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.titulo}>{titulo}</Text>
        <View style={styles.linha}>
          <Text style={styles.label}>Max. Pontos:</Text>
          <Text style={styles.valor}>{maxPontos}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AtividadeCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cfeba1",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  titulo: {
    fontSize: 18,
    fontWeight: 800,
    color: "#333",
    marginBottom: 8,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  label: {
    fontSize: 16,
    color: "#444",
  },
  valor: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },
});
