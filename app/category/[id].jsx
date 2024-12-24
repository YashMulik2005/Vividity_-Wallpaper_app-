import { View, Text, FlatList } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import ImageCard from "../../components/ImageCard";

const CategoryWallpapers = () => {
  const route = useRoute();
  const { id } = route.params;
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
      className="h-full w-full px-3"
    >
      <SafeAreaView>
        <View className="px-2 py-4">
          <Text className="text-white font-bold text-3xl">{id}</Text>
        </View>
        <View className=" flex items-center">
          <FlatList
            data={arr}
            renderItem={({ index, item }) => (
              <ImageCard index={index} item={item} />
            )}
            keyExtractor={(item) => item.url}
            nestedScrollEnabled={true}
            numColumns={3}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CategoryWallpapers;
