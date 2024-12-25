import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const WallapeparSkeleton = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          opacity: opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    height: 256,
    borderRadius: 8,
    margin: 4,
    backgroundColor: "#343434",
    aspectRatio: 2 / 4,
  },
});

export default WallapeparSkeleton;
