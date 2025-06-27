import React from "react";
import { StyleSheet, Text, View } from "react-native";

type props = {
  title: string;
};

const ScreenTitle = ({ title }: props) => {
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default ScreenTitle;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#0f470ea9",
    height: "100%",
    width: "100%",
    justifyContent: "center", 
    borderWidth:1,
    borderColor:"#0f470e40",
    alignItems: "center", 
  },
  nav: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  title: {
    textAlign: "center",
    color: "#fff", 
    fontSize: 18, 
  },
});
