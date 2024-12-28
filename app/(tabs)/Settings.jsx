import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Settings = () => {
  const [userData, setuserData] = useState(null);
  const [loader, setloader] = useState(false);

  const getdata = async () => {
    setloader(true);
    const data = await AsyncStorage.getItem("user");
    console.log(data);
    setuserData(JSON.parse(data));
    setloader(false);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    router.push("/Auth/Login");
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <SafeAreaView>
      <View className=" bg-primaryDark h-full p-4">
        <Text className=" text-white text-center text-lg md:text-3xl font-bold mt-5">
          Settings
        </Text>
        <View className=" flex flex-col justify-center py-12">
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
          <View className=" my-4 px-5 flex flex-col gap-3">
            <Text className=" text-white text-xl">
              Username: {userData?.username}
            </Text>
            <Text className=" text-white text-xl">
              Email: {userData?.email}
            </Text>
            <TouchableOpacity
              className=" bg-buttonSecondary p-[14px] rounded-xl my-4"
              onPress={logout}
            >
              <Text className=" text-white font-bold text-center">Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="white" backgroundColor="#1A1A1A" />
    </SafeAreaView>
  );
};

export default Settings;
