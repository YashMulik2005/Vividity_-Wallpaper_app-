import { View, Text, Platform } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarPosition: "bottom",
        tabBarActiveTintColor: "#00AD9F",
        tabBarInactiveTintColor: "#545454",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#262626",
          borderTopWidth: 0,
          height: 55,
        },
      }}
    >
      <Tabs.Screen
        name="Homescreen"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome6 name={"house"} size={22} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="Category"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name={"appstore1"} size={25} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="favorite"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={"heart"} size={25} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="Settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={"settings"} size={25} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
