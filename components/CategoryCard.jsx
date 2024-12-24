import { View, Text, ImageBackground } from "react-native";
import React from "react";

const CategoryCard = ({ data }) => {
  return (
    <View className="mx-1">
      <ImageBackground
        source={{ uri: data.url }}
        className="h-20 rounded-md overflow-hidden aspect-[4/2]"
        imageStyle={{ borderRadius: 10 }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <Text className="text-white text-xl font-bold">Abstract</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CategoryCard;
