import { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import HomeButton from "@components/HomeButtons";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@context/types";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


type props = {
  show: boolean;
  onClose: () => void;
};

const { width } = Dimensions.get("window");

const SideBar = ({ show, onClose }: props) => {
   const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const slideAnim = useRef(new Animated.Value(-width)).current; 

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("auth_token");
      await AsyncStorage.removeItem("user");
  
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  useEffect(() => {
    if (show) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width, 
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);

  return (
    <Modal
      transparent
      animationType="none"
      visible={show}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.dialog,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
               <HomeButton
                title="INICIO"
                icon={<MaterialIcons name="person" size={28} color="#ffffff" />}
                onPress={() => navigation.navigate("Home")}
                variant="contained"
                color="primary"
                type="dialog"
               
              />
             
              <HomeButton
                title="SAIR"
                icon={<MaterialIcons name="logout" size={28} color="#fff" />}
                variant="contained"
                color="primary"
                type="dialog"
                onPress={handleLogout}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-start", 
  },
  dialog: {
    backgroundColor: "#181414",
    paddingVertical: 20,
    paddingHorizontal: 1,
    borderTopRightRadius: 20, 
    borderBottomRightRadius: 20,
    width: "60%",
    gap: 12,
    alignItems: "center",
    elevation: 6,
  },
});

export default SideBar;
