import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const CategoryPageSkeleton = () => {
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
    marginVertical: 8,
  },
  skeleton: {
    height: 96,
    borderRadius: 10,
    overflow: "hidden",
    aspectRatio: 2,
    backgroundColor: "#343434",
  },
});

export default CategoryPageSkeleton;
