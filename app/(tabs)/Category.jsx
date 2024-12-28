import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-virtualized-view";
import { router } from "expo-router";
import axios from "axios";
import CategoryPageSkeleton from "../../components/CategoryPageSkeleton";

const Category = () => {
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(false);

  const getdata = async () => {
    setloader(true);
    const data = await axios.get(
      "https://wallpaper-app-backend.vercel.app/api/category/categories"
    );
    // console.log(data.data);
    setdata(data.data);
    setloader(false);
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <LinearGradient
      colors={["#1B525B", "#3b7a8b", "#1A2433"]}
      className="h-full w-full px-5"
    >
      <SafeAreaView>
        <ScrollView>
          <View className=" pt-12 w-full">
            <Text className="text-white text-md md:text-xl xl:text-3xl font-bold mx-2 my-3">
              Browse By Category{" "}
            </Text>
            <View className=" w-full flex justify-center items-center">
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
                      ]
                    : data
                }
                renderItem={({ item }) =>
                  loader ? (
                    <CategoryPageSkeleton />
                  ) : (
                    <TouchableOpacity
                      onPress={() => router.push(`category/${item._id}`)}
                      className=" m-1 h-full w-[48%]"
                    >
                      <ImageBackground
                        source={{ uri: item.image }}
                        className=" w-[100%] rounded-md overflow-hidden aspect-[4/2]"
                        imageStyle={{ borderRadius: 10 }}
                      >
                        <View className="flex-1 justify-center items-center bg-black/50">
                          <Text className="text-white text-sm md:text-lg lg:text-xl font-bold">
                            {item.name}
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  )
                }
                numColumns={2}
                keyExtractor={(item) => item._id.toString()}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Category;
