import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const Splashscreen = () => {
  return (
    <LinearGradient
      colors={["#1B525B", "#3b7a8b", "#1A2433"]}
      className=" font-poppins h-full w-full"
    >
      <SafeAreaView className="flex justify-center items-center h-full ">
        <View className="">
          <Image
            source={require("../assets/images/logo.png")}
            className="w-48 h-48 "
            resizeMode="contain"
          />
          <Text className=" text-center text-[40px] mt-[-20px] text-white text-bold">
            Vividity
          </Text>
          <Text className=" text-center  text-offwhite">─</Text>
          <Text className="text-xl text-center text-offwhite">
            4k Wallpapers
          </Text>
        </View>
      </SafeAreaView>
      <StatusBar style="auto" backgroundColor="#1B525B" />
    </LinearGradient>
  );
};

export default Splashscreen;
