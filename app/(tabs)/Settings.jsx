import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Settings = () => {
  return (
    <SafeAreaView>
      <View className=" bg-primaryDark h-full">
        <Text className=" text-white text-center text-3xl font-bold mt-5">
          Settings
        </Text>
        <View className=" flex flex-col justify-center items-center w-52">
          <Image
            source={require("../../assets/images/logo.png")}
            className="w-40 h-40 "
            resizeMode="contain"
          />
          <Text className="text-3xl mt-[-20px] text-white text-bold">
            Vividity
          </Text>
        </View>
      </View>
      <StatusBar style="auto" backgroundColor="#1A1A1A" />
    </SafeAreaView>
  );
};

export default Settings;
