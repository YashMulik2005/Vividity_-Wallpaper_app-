import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Categorylayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoryWallpapers" />
    </Stack>
  );
};

export default Categorylayout;
