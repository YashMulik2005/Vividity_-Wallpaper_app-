import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import ImageCard from "../../components/ImageCard";
import axios from "axios";
import { ScrollView } from "react-native-virtualized-view";

const CategoryWallpapers = () => {
  const route = useRoute();
  const { id } = route.params;
  const [data, setdata] = useState([]);

  const getdata = async () => {
    const res = await axios.get(
      `https://wallpaper-app-backend.vercel.app/api/wallpaper/wallpapers/category/${id}`
    );
    // console.log(data.data);
    setdata(res.data);
    // console.log(res.data);
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <LinearGradient
      colors={["#1B525B", "#3b7a8b", "#1A2433"]}
      className="h-full w-full px-3"
    >
      <SafeAreaView>
        <ScrollView>
          <View className="px-2 py-4">
            <Text className="text-white font-bold text-3xl">
              {data[0]?.category?.name}
            </Text>
          </View>
          <View className=" flex items-center">
            <FlatList
              data={data}
              renderItem={({ index, item }) => (
                <ImageCard index={index} item={item} />
              )}
              keyExtractor={(item) => item._id}
              nestedScrollEnabled={true}
              numColumns={3}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CategoryWallpapers;
