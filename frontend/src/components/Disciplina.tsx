import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type Props = {
  titulo: string|null;
  semestre?: string;
  onPress?: () => void;
  selected?: boolean;
};

const Disciplina = ({ titulo, semestre, onPress, selected = false }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, selected && styles.containerSelecionado]}>
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>{titulo}</Text>
          {semestre && <Text style={styles.semestre}>{semestre}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Disciplina;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b741c",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    justifyContent: "space-between",
    marginVertical: 5,
  },
  containerSelecionado: {
    borderColor: "lime",
    backgroundColor: "#3b5aa1",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titulo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
  },
  semestre: {
    color: "#fff",
    fontSize: 16,
    marginTop: 2,
  },
});
