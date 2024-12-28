import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SinglePageSkeleton from "../../components/SinglePageSkeleton";

const GeneratedImage = () => {
  const [data, setdata] = useState(null);
  const [loader, setloader] = useState(false);
  const getData = async () => {
    setloader(true);
    const propmt = await AsyncStorage.getItem("prompt");

    const res = await axios.get(
      `https://image.pollinations.ai/prompt/${propmt}`
    );
    console.log(res.request.responseURL);
    setdata(res.request.responseURL);
    await AsyncStorage.removeItem("prompt");
    setloader(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LinearGradient
      colors={["#1B525B", "#3b7a8b", "#1A2433"]}
      className="h-full w-full px-6"
    >
      {loader ? (
        <SinglePageSkeleton />
      ) : (
        <SafeAreaView className=" flex flex-col gap-4 justify-center h-full">
          {/* <Text className="text-white text-3xl text-semibold mt-4">
            {data?.category?.name}
          </Text> */}
          <Image
            source={{
              uri: data,
            }}
            className=" max-h-full h-[85%] rounded-xl object-contain"
          />
          <TouchableOpacity>
            <Text className=" text-black text-center py-[8px] rounded-md font-bold text-xl bg-offwhite">
              Download
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </LinearGradient>
  );
};

export default GeneratedImage;
