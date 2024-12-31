import React, { useEffect, useState } from "react";
import "../global.css";
import { ActivityIndicator, Text, View } from "react-native";
import Homescreen from "./(tabs)/Homescreen";
import SplashScreen from "../components/Splashscreen";
import Login from "./Auth/Login";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import TabLayout from "./(tabs)/_layout";
import Toast from "react-native-toast-message";

export default function MainScreen() {
  const [splash, setsplash] = useState(true);
  const [UserToken, setUserToken] = useState(false);

  const getUserData = async () => {
    setsplash(true);
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const res = await axios.get(
        "https://wallpaper-app-backend.vercel.app/api/user/user",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(res);
      // console.log(token);
      setUserToken(true);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      // console.log(await AsyncStorage.getItem("user"));
      router.push("/(tabs)/Homescreen");
    }
    setsplash(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (splash) {
    return (
      <SafeAreaView className=" flex justify-center items-center h-full bg-[#1B525B]">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  const toastConfig = {
    success: ({ text1, props, ...rest }) => {
      return (
        <View className=" rounded-md px-5 py-3 bg-black border border-b-green-600">
          <Text className=" text-white text-sm md:text-mg lg:text-lg xl:text-xl 2xl:text-3xl text-center">
            {text1}
          </Text>
        </View>
      );
    },
    error: ({ text1, props, ...rest }) => {
      return (
        <View className=" rounded-md px-5 py-3 bg-black border border-b-red-700">
          <Text className=" text-white text-sm md:text-mg lg:text-lg xl:text-xl 2xl:text-3xl text-center">
            {text1}
          </Text>
        </View>
      );
    },
  };

  return (
    <>
      {UserToken ? <TabLayout /> : <Login />}
      <Toast config={toastConfig} />
    </>
  );

  // return <SplashScreen />;
}
