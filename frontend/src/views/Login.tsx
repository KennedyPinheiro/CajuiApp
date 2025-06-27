import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import InputCard from "@components/InputCard";
import Button from "@components/Button";
import LoginLogo from "@components/LoginLogo";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@context/types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "@context/config";

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = email.trim() !== "" && senha.trim() !== "";

  const handleLogin = async () => {
    if (!isFormValid) return;

    setErro(null);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password: senha,
      });

      const { token, user } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      navigation.navigate("Home");
    } catch (error: any) {
      setErro(error.response?.data?.message || "Erro ao tentar login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.spacerTop} />
          <LoginLogo />
          <View style={styles.section}>
            <InputCard
              tipo="string"
              placeholder="nome@example.com"
              value={email}
              onChangeText={setEmail}
            />
            <InputCard
              tipo="password"
              placeholder="***************"
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <View style={styles.button}>
            {erro && <Text style={styles.erro}>{erro}</Text>}
            <Button
              title={isLoading ? "Entrando..." : "Login"}
              variant="contained"
              color="primary"
              onPress={handleLogin}
              disabled={!isFormValid || isLoading}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAE1",
    paddingHorizontal: 16,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spacerTop: {
    marginBottom: -60,
  },
  section: {
    width: "100%",
    alignItems: "center",
  },

  button: {
    width: "100%",
    marginTop:50,
    alignItems: "center",
  },
  erro: { color: "red", textAlign: "center", marginBottom: 10 },
});
