import React from "react";
import { View, Text, FlatList, Image, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view";
import CategoryCard from "../../components/CategoryCard";
import ImageCard from "../../components/ImageCard";

const Homescreen = () => {
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
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className=" pt-2">
            <Text className="text-white text-xl font-semibold mx-2">
              Latest
            </Text>
            <FlatList
              data={arr}
              renderItem={({ item }) => (
                <View>
                  <Image
                    source={{ uri: item.url }}
                    className="w-28 h-44 rounded-md mx-2 object-cover"
                  />
                </View>
              )}
              keyExtractor={(item) => item.url}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          </View>

          <View className="">
            <Text className="text-white text-xl font-semibold mx-2">
              Popular Categories{" "}
              <FontAwesome5 name={"fire"} size={15} color="#00F798" />
            </Text>
            <FlatList
              data={arr}
              renderItem={({ item }) => <CategoryCard data={item} />}
              keyExtractor={(item) => item.url}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          </View>

          <View className="w-full flex items-center mt-2">
            <View className="bg-buttonSecondary w-1/2 rounded-md py-2">
              <Text className="text-white text-center text-xl">
                New Wallpapers{" "}
                <FontAwesome5 name={"fire"} size={15} color="#00F798" />
              </Text>
            </View>
            <FlatList
              className="p-1"
              data={arr}
              renderItem={({ item, index }) => (
                <ImageCard index={index} item={item} />
              )}
              keyExtractor={(item) => item.url}
              nestedScrollEnabled={true}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 8,
              }}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            />
          </View>
          <StatusBar style="auto" backgroundColor="#1B525B" />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Homescreen;
