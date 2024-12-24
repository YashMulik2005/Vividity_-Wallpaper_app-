import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-virtualized-view";
import CategoryCard from "../../components/CategoryCard";
import { router } from "expo-router";

const Category = () => {
  const arr = [
    {
      url: "https://i.pinimg.com/736x/ab/dd/f6/abddf6022bf2188ef6fe778c54ee9a3e.jpg",
    },
    {
      url: "https://i.pinimg.com/474x/fa/43/f4/fa43f4dedc679be3cd1dc703fbe6cf88.jpg",
    },
    {
      url: "https://i.pinimg.com/474x/34/8d/20/348d202859f0c9f0ab32876692030989.jpg",
    },
    {
      url: "https://i.pinimg.com/474x/50/e9/94/50e99412a06cc4360670e554f7b2b2e3.jpg",
    },
  ];

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
              data={arr}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => router.push("category/Abstract")}
                  className="mx-1 my-2"
                >
                  <ImageBackground
                    source={{ uri: item.url }}
                    className=" h-[57px] rounded-md overflow-hidden aspect-[4/2]"
                    imageStyle={{ borderRadius: 10 }}
                  >
                    <View className="flex-1 justify-center items-center bg-black/50">
                      <Text className="text-white text-sm font-bold">
                        Abstract
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              )}
              numColumns={3}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Category;
