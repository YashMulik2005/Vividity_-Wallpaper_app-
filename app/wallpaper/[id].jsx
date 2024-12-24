import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const SingleWallpaper = () => {
  const route = useRoute();
  const { id } = route.params;
  const url =
    "https://i.pinimg.com/474x/50/e9/94/50e99412a06cc4360670e554f7b2b2e3.jpg";
  return (
    <LinearGradient
      colors={["#1B525B", "#3b7a8b", "#1A2433"]}
      className="h-full w-full px-8"
    >
      <SafeAreaView className=" flex flex-col gap-2">
        <Text className="text-white text-3xl text-semibold my-4">nejdeb</Text>
        <Image
          source={{ uri: url }}
          className=" max-h-full h-[85%] rounded-xl"
        />
        <TouchableOpacity>
          <Text className=" text-black text-center py-[8px] rounded-md font-bold text-xl bg-offwhite">
            Download
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SingleWallpaper;
