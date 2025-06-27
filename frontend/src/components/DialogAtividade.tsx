import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
 
} from "react-native";
import AtividadeCard from "@components/AtividadeCard";
import { AtividadeType, NotaType } from "@context/types";
import API_BASE_URL from "@context/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

type Props = {
  open?: boolean;
  onClose: () => void;
  atividades: AtividadeType[];
  notas?: NotaType[];
};

const DialogAtividades = ({ open, onClose, atividades, notas = [] }: Props) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [notaFinal, setNotaFinal] = useState<number>(0);
  const [totalNota, setTotalNota] = useState<number>(0);
  const [totalMaxPontos, setTotalMaxPontos] = useState<number>(0);

  const toggleNota = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getNota = (atividadeId: number): number => {
    return notas.find((n) => n.atividade_id === atividadeId)?.nota ?? 0;
  };

  useEffect(() => {
    const fetchNotaFinal = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (!userData) return;

        const user = JSON.parse(userData);
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const disciplinaId = atividades[0]?.disciplina_id;
        if (!disciplinaId) return;

        const response = await axios.get(
          `${API_BASE_URL}/api/nota-final?aluno_id=${user.id}&disciplina_id=${disciplinaId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotaFinal(response.data.nota_final);
        setTotalNota(response.data.total_nota);
        setTotalMaxPontos(response.data.total_max_pontos);
      } catch (error) {
        console.error("Erro ao buscar nota final:", error);
      }
    };

    if (open && atividades.length > 0) {
      fetchNotaFinal();
    }
  }, [open, atividades]);

  return (
    <>
      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <View>
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.title}>Atividades</Text>
                </View>

                <ScrollView>
                  <View style={{ padding: 10 }}>
                    {atividades.length > 0 ? (
                      atividades.map((atividade) => (
                        <View key={atividade.id}>
                          <AtividadeCard
                            titulo={atividade.titulo}
                            maxPontos={atividade.max_pontos}
                            onPress={() => toggleNota(atividade.id)}
                          />

                          {expandedId === atividade.id && (
                            <Text style={styles.nota}>
                              Nota: {getNota(atividade.id)}
                            </Text>
                          )}
                        </View>
                      ))
                    ) : (
                      <Text style={styles.text}>
                        Nenhuma atividade disponível.
                      </Text>
                    )}
                  </View>
                  
                </ScrollView><View style={styles.footer}>
                    <Text style={styles.footerText}>
                      Max Pontos: {totalMaxPontos}
                    </Text>
                    <Text style={styles.footerText}>
                      Total Nota: {totalNota}
                    </Text>
                    <Text style={styles.footerText}>
                      Média Final: {notaFinal}
                    </Text>
                  </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#1a2c05",
    borderWidth: 3,
    maxHeight: "95%",
  },
  header: {
    backgroundColor: "#1a2c05",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  content: {
    paddingHorizontal: 10,
    maxHeight: 300,
  },
  nota: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight:700,
    color: "#333",
  },
  text: {
    padding: 16,
    textAlign: "center",
    color: "#555",
  },
  footer: {
    borderTopWidth: 1,
    flexDirection:"row",
    gap:20,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "#d1acac",
    alignItems: "center",
  },
  footerText: {
    fontSize: 17,
    fontWeight: 800,
  },
});

export default DialogAtividades;
