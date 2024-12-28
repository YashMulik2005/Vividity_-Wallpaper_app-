import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import ImageCard from "../../components/ImageCard";
import axios from "axios";
import { ScrollView } from "react-native-virtualized-view";
import WallapeparSkeleton from "../../components/WallapeparSkeleton";

const CategoryWallpapers = () => {
  const route = useRoute();
  const { id } = route.params;
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(false);

  const getdata = async () => {
    setloader(true);
    const res = await axios.get(
      `https://wallpaper-app-backend.vercel.app/api/wallpaper/wallpapers/category/${id}`
    );
    // console.log(data.data);
    setdata(res.data);
    // console.log(res.data);
    setloader(false);
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
            <Text className="text-white font-bold text-lg md:text-3xl">
              {data[0]?.category?.name}
            </Text>
          </View>
          <View className=" flex items-center">
            <FlatList
              data={
                loader
                  ? [
                      { _id: "1" },
                      { _id: "2" },
                      { _id: "3" },
                      { _id: "4" },
                      { _id: "5" },
                      { _id: "6" },
                      { _id: "7" },
                      { _id: "8" },
                      { _id: "9" },
                    ]
                  : data
              }
              renderItem={({ index, item }) =>
                loader ? (
                  <WallapeparSkeleton />
                ) : (
                  <ImageCard index={index} item={item} />
                )
              }
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
