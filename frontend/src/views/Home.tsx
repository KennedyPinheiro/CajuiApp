import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@context/types";
import Disciplina from "@components/Disciplina";
import ImagemPerfil from "@components/ImagemPerfil";
import NavBar from "@components/Navbar";
import DialogAtividades from "@components/DialogAtividade";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "@context/config";

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [atividades, setAtividades] = useState<any[]>([]);
  const [notas, setNotas] = useState<any[]>([]);
  const [openAtv, setOpeAtv] = useState(false);
  const [roleId, setRoleId] = useState<number | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  const [matricula, setMatricula] = useState<number | null>(null);
  const [alunoId, setAlunoId] = useState<number | null>(null);
  const [disciplinaSelecionadaId, setDisciplinaSelecionadaId] = useState<
    number | null
  >(null);

  const atividadesFiltradas = atividades.filter(
    (atividade) => atividade.disciplina_id === disciplinaSelecionadaId
  );

  const notasFiltradas = notas.filter((nota) =>
    atividadesFiltradas.some((atv) => atv.id === nota.atividade_id)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userData = await AsyncStorage.getItem("user");

        if (!token || !userData) {
          console.warn("Token ou dados do usuário não encontrados.");
          return;
        }

        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const user = JSON.parse(userData);
        setRoleId(user.role_id);
        setNome(user.name);
        setMatricula(user.matricula);
        setAlunoId(user.id);

        const [discRes, atvRes, notaRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/disciplinas`, headers),
          axios.get(`${API_BASE_URL}/api/atividades`, headers),
          axios.get(
            `${API_BASE_URL}/api/atividade-notas?aluno_id=${user.id}`,
            headers
          ),
        ]);
        const notaData = notaRes.data;

        const notasArray = Array.isArray(notaData)
          ? notaData
          : notaData.notas || [];

        setDisciplinas(discRes.data);
        setAtividades(atvRes.data);
        setNotas(notasArray);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleDisciplinaPress = (disciplinaId: number) => {
    if (roleId === 1) {
      navigation.navigate("Disciplina");
    } else {
      setDisciplinaSelecionadaId(disciplinaId);
      setOpeAtv(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <NavBar />
      <ImagemPerfil nome={nome} matricula={matricula} />
      <View style={{ alignItems: "center" }}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Disciplinas</Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            {disciplinas.length > 0 ? (
              disciplinas.map((disciplina) => (
                <Disciplina
                  key={disciplina.id}
                  titulo={disciplina.nome}
                  semestre={`${disciplina.semestre}° Semestre`}
                  onPress={() => handleDisciplinaPress(disciplina.id)}
                />
              ))
            ) : (
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                Não há disciplinas disponíveis.
              </Text>
            )}
          </View>
        </View>
      </View>

      

      <DialogAtividades
        open={openAtv}
        onClose={() => setOpeAtv(false)}
        atividades={atividadesFiltradas}
        notas={notasFiltradas}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1dbcb",
  },
  header: {
    backgroundColor: "#1a2c05",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 13,
  },
  card: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#afc285cc",
    width: "90%",
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
});

export default Home;
