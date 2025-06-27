import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
 type props={
  nome:string |null
  matricula:number|null
 }
const ImagemPerfil = ({nome,matricula}:props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imagem}>
        <MaterialCommunityIcons
          name="account-tie"
          size={75}
          color="#ffffff"
        />
      </View>
    <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.matricula}>matricula:   {matricula}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  imagem: {
    backgroundColor: "#34AD32",
    padding:15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  nome: {
    fontSize: 28,
    fontWeight: 900,
    color: "#000000",
  },
  matricula: {
    fontSize: 20,
    fontWeight: 600,
    color: "#000000",
  },
});

export default ImagemPerfil;
