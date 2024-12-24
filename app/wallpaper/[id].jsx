import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const SingleWallpaper = () => {
  const route = useRoute();
  const { id } = route.params;
  const [data, setdata] = useState([]);

  const getdata = async () => {
    const res = await axios.get(
      `https://wallpaper-app-backend.vercel.app/api/wallpaper/wallpapers/${id}`
    );
    // console.log(res.data);
    setdata(res.data);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <LinearGradient
      colors={["#1B525B", "#3b7a8b", "#1A2433"]}
      className="h-full w-full px-6"
    >
      <SafeAreaView className=" flex flex-col gap-2">
        <Text className="text-white text-3xl text-semibold my-4">
          {data?.category?.name}
        </Text>
        <Image
          source={{ uri: data.image }}
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
