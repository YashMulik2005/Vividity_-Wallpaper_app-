import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const CategoryCard = ({ data }) => {
  return (
    <TouchableOpacity
      className="mx-1"
      onPress={() => router.push(`category/${data._id}`)}
    >
      <ImageBackground
        source={{ uri: data.image }}
        className="h-20 rounded-md overflow-hidden aspect-[4/2]"
        imageStyle={{ borderRadius: 10 }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <Text className="text-white text-sm md:text-lg lg:text-xl font-bold">
            {data.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CategoryCard;
