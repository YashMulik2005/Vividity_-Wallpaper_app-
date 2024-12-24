import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const ImageCard = ({ index, item }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        // router.push({ pathname: "/wallpaper", query: { id: item.url } });
        // router.push({ pathname: "/wallpaper/[id]", query: { id: item.url } });
        router.push(`/wallpaper/1`);
      }}
    >
      <Image
        key={index}
        source={{ uri: item.url }}
        className=" h-64 rounded-md object-cover m-1 aspect-[2/4]"
      />
    </TouchableOpacity>
  );
};

export default ImageCard;
