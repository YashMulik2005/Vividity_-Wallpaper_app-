import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const CategorySkeleton = () => {
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
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.skeleton,
          {
            opacity: opacity,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
  },
  skeleton: {
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    aspectRatio: 2,
    backgroundColor: "#343434",
  },
});

export default CategorySkeleton;
