import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";

type Props = {
  children?: React.ReactNode;
  onPress?: () => void;
};

const UserIcon = ({ children, onPress }: Props) => {
  const [active, setActive] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  
  const topBarStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 8],
        }),
      },
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  const middleBarStyle = {
    opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
  };

  const bottomBarStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -8],
        }),
      },
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "-45deg"],
        }),
      },
    ],
  };

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Animated.View style={[styles.bar, topBarStyle]} />
          <Animated.View style={[styles.bar, middleBarStyle]} />
          <Animated.View style={[styles.bar, bottomBarStyle]} />
        </View>
      </TouchableOpacity>

      {active && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 30,
    justifyContent: "space-between",
    paddingVertical: 4,
    marginRight: -150,
  },
  bar: {
    height: 4,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
});

export default UserIcon;
