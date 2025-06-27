import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type Props = {
  nome: string;
  matricula: string;
  onPress?: () => void;
  selected?: boolean;
};

const AlunoCard = ({ nome, matricula, onPress, selected = false }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, selected && styles.containerSelecionado]}>
        <View style={styles.textContainer}>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.matricula}>Matrícula: {matricula}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AlunoCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#30ad449b",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    justifyContent: "space-between",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#062046",
  },
  containerSelecionado: {
    borderColor: "lime",
    backgroundColor: "#000000",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nome: {
    color: "#615959",
    fontWeight: "bold",
    fontSize: 25,
  },
  matricula: {
    color: "#777171",
    fontSize: 16,
    marginTop: 2,
  },
});
