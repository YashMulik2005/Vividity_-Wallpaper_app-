import React, { useEffect, useState } from "react";
import "../global.css";
import { Text, View } from "react-native";
import Homescreen from "./(tabs)/Homescreen";
import SplashScreen from "../components/Splashscreen";
import { router } from "expo-router";

export default function MainScreen() {
  const [splash, setsplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setsplash(false);
      router.push("(tabs)/Homescreen");
    }, 3000);
  }, []);

  return splash ? <SplashScreen /> : <Homescreen />;
  // return <SplashScreen />;
}
