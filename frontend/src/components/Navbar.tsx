import { useState } from "react";
import { StyleSheet, View } from "react-native";
import SideBar from "@components/SideBar";
import UserIcon from "@components/Usericon";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type props = {
  backButton?: boolean;
  actionMenu?: () => void;
  onBack?: () => void;
};

const NavBar = ({ onBack }: props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShowDialog = () => {
    setShow(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <UserIcon onPress={handleShowDialog} />
        <MaterialCommunityIcons name="bell" size={40} color="#ffffff" />
      </View>
      <SideBar show={show} onClose={handleClose} />
    </View>
  );
};

export default NavBar;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop:1,
    backgroundColor: "#1a2c05",
    height: "10%",
    width: "100%",
  },
  nav: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop:30
  },
});
