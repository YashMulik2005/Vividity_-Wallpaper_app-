import React, { useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Animated, StyleSheet } from "react-native";

const SinglePageSkeleton = () => {
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
    <SafeAreaView style={styles.container} classname=" mt-5">
      <View style={styles.skeletonImage} />
      <Animated.View
        style={[
          styles.downloadButton,
          {
            opacity: opacity,
          },
        ]}
      >
        <Text style={styles.downloadText}></Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    marginTop: 10,
  },
  skeletonImage: {
    marginTop: 20,
    maxHeight: "85%",
    height: "85%",
    borderRadius: 20,
    backgroundColor: "#343434",
  },
  downloadButton: {
    backgroundColor: "#343434",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default SinglePageSkeleton;
