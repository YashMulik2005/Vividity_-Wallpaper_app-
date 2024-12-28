import React, { useEffect, useState } from "react";
import "../global.css";
import { Text, View } from "react-native";
import Homescreen from "./(tabs)/Homescreen";
import SplashScreen from "../components/Splashscreen";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function MainScreen() {
  const [splash, setsplash] = useState(true);

  const getUserData = async () => {
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
      console.log(res);
      console.log(token);

      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      console.log(await AsyncStorage.getItem("user"));

      setsplash(false);
      router.push("/(tabs)/Homescreen");
    } else {
      router.push("/Auth/Login");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return splash ? <SplashScreen /> : <Homescreen />;
  // return <SplashScreen />;
}
