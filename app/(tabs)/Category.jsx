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
import CategoryCard from "../../components/CategoryCard";
import { router } from "expo-router";
import axios from "axios";

const Category = () => {
  const [data, setdata] = useState([]);

  const getdata = async () => {
    const data = await axios.get(
      "https://wallpaper-app-backend.vercel.app/api/category/categories"
    );
    // console.log(data.data);
    setdata(data.data);
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
          <View className=" pt-12">
            <Text className="text-white text-3xl font-bold mx-2 my-5">
              Browse By Category{" "}
            </Text>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => router.push(`category/${item._id}`)}
                  className="mx-1 my-2"
                >
                  <ImageBackground
                    source={{ uri: item.image }}
                    className=" h-[57px] rounded-md overflow-hidden aspect-[4/2]"
                    imageStyle={{ borderRadius: 10 }}
                  >
                    <View className="flex-1 justify-center items-center bg-black/50">
                      <Text className="text-white text-sm font-bold">
                        {item.name}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              )}
              numColumns={3}
              keyExtractor={(item) => item._id}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Category;
