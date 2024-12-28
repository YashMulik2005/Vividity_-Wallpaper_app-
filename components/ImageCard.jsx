import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const ImageCard = ({ index, item }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/wallpaper/${item._id}`);
      }}
      style={styles.cardContainer}
    >
      <Image
        key={index}
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: width * 0.01,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    width: width * 0.3,
    height: width * 0.65,
    borderRadius: 5,
  },
});

export default ImageCard;
