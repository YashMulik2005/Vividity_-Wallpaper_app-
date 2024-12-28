import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view";
import CategoryCard from "../../components/CategoryCard";
import ImageCard from "../../components/ImageCard";
import axios from "axios";
import { router } from "expo-router";
import WallapeparSkeleton from "../../components/WallapeparSkeleton";
import CategorySkeleton from "../../components/CategorySkeleton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Homescreen = () => {
  const [Category, setCategory] = useState([]);
  const [tranding, settranding] = useState([]);
  const [wallpaers, setwallpaers] = useState([]);
  const [loading, setloading] = useState(false);
  const [categoryLoader, setcategoryLoader] = useState(false);
  const [moreloader, setmoreloader] = useState(false);

  const getCategories = async () => {
    setcategoryLoader(true);
    const res = await axios.get(
      `https://wallpaper-app-backend.vercel.app/api/category/categories/random`
    );
    setCategory(res.data);
    setcategoryLoader(false);
  };

  const getTranding = async () => {
    const res = await axios.get(
      `https://wallpaper-app-backend.vercel.app/api/wallpaper/wallpapers/random`
    );
    settranding(res.data);
  };

  const getWallpapers = async () => {
    setloading(true);
    const res = await axios.get(
      `https://wallpaper-app-backend.vercel.app/api/wallpaper/wallpapers`
    );
    setwallpaers(res?.data?.wallpapers);
    // setcurrentPage(res?.data?.currentPage);
    // sethasMore(res?.data?.hasMore);
    // setlink(res?.data?.link);
    // setlastlink(
    //   `https://wallpaper-app-backend.vercel.app/api/wallpaper/wallpapers?page=${currentPage}`
    // );
    setloading(false);
  };

  const fetchMore = async () => {
    if (!hasMore || loading || moreloader || link == null || link === lastlink)
      return;
    setmoreloader(true);
    const res = await axios.get(link);
    setlastlink(link);
    setwallpaers((prev) => [...prev, ...res?.data?.wallpapers]);
    sethasMore(res?.data?.hasMore);
    setlink(res?.data?.link);
    setmoreloader(false);
  };

  // <View className=" pt-2">
  //   <Text className="text-white text-xl font-semibold mx-2">Trending</Text>
  //   <FlatList
  //     data={tranding}
  //     renderItem={({ item }) => (
  //       <TouchableOpacity
  //         onPress={() => {
  //           router.push(`/wallpaper/${item._id}`);
  //         }}
  //       >
  //         <Image
  //           source={{ uri: item.image }}
  //           className="w-28 h-44 rounded-md mx-2 object-cover"
  //         />
  //       </TouchableOpacity>
  //     )}
  //     keyExtractor={(item) => item._id}
  //     horizontal
  //     showsHorizontalScrollIndicator={false}
  //     contentContainerStyle={{ paddingVertical: 10 }}
  //   />
  // </View>;
  const handleBackPress = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to exit?",
      [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "Exit", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const backHandlerListener = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => backHandlerListener.remove();
    }, [])
  );

  useEffect(() => {
    getCategories();
    // getTranding();
    getWallpapers();
  }, []);

  return (
    <LinearGradient
      colors={["#1B525B", "#3b7a8b", "#1A2433"]}
      className="h-full w-full px-3"
    >
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className=" rounded-lg my-1 mx-2">
            <LinearGradient
              colors={["#00AD9F", "#5853CD", "#8029E2"]}
              className="rounded-lg p-4"
              style={styles.linearGradient}
            >
              <View className=" flex flex-row justify-end items-center">
                <View className=" w-[50%]">
                  <Image
                    source={require("../../assets/images/logo.png")}
                    className=" h-28 aspect-square"
                  />
                </View>
                <View className=" w-[50%] flex flex-col items-end gap-2">
                  <Text className=" text-white font-bold text-sm md:text-lg lg:text-xl 2xl:text-3xl text-right">
                    Let AI Paint Your Screen
                  </Text>
                  <TouchableOpacity
                    className="px-2 py-3 rounded-md bg-[#A800F7] block"
                    onPress={() => router.push("/AiImage/MainScreen")}
                  >
                    <Text className="text-white text-sm md:text-lg lg:text-xl 2xl:text-3xl font-semibold text-center">
                      Generate With A.I
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
          <View className="">
            <View className=" flex flex-row justify-between items-center w-full">
              <Text className="text-white text-sm md:text-lg lg:text-xl my-1 2xl:text-3xl font-semibold mx-2">
                Popular Categories{" "}
                <FontAwesome5 name={"fire"} size={15} color="#00F798" />
              </Text>
            </View>
            <FlatList
              data={
                categoryLoader
                  ? [{ _id: "1" }, { _id: "2" }, { _id: "3" }, { _id: "4" }]
                  : Category
              }
              renderItem={({ item }) =>
                categoryLoader ? (
                  <CategorySkeleton />
                ) : (
                  <CategoryCard data={item} />
                )
              }
              keyExtractor={(item) => item._id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          </View>

          <View className="w-full flex items-center mt-2">
            <View className=" w-full flex flex-row justify-center items-center ">
              <View className=" bg-[#262626] w-[90%] flex flex-row justify-center items-center rounded-md">
                <View className="bg-buttonSecondary w-[50%] rounded-md py-3  ">
                  <Text className="text-white text-center text-sm md:text-lg lg:text-xl">
                    New Wallpapers{" "}
                    <FontAwesome5 name={"fire"} size={15} color="#00F798" />
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    router.push("/AiImage/MainScreen");
                  }}
                  className="bg-[#262626] w-[50%] rounded-r-md py-3"
                >
                  <Text className="text-[#A1A1A1] text-center text-sm md:text-lg lg:text-xl">
                    Generate with A.I{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              className="p-1"
              data={
                loading
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
                  : wallpaers
              }
              renderItem={({ item, index }) =>
                loading ? (
                  <WallapeparSkeleton />
                ) : (
                  <ImageCard index={index} item={item} />
                )
              }
              keyExtractor={(item) => item._id.toString()}
              nestedScrollEnabled={true}
              numColumns={3}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              // onEndReached={fetchMore}
              // ListFooterComponent={
              //   moreloader ? (
              //     <View className=" flex flex-row">
              //       <WallapeparSkeleton />
              //       <WallapeparSkeleton />
              //       <WallapeparSkeleton />
              //     </View>
              //   ) : null
              // }
              maxToRenderPerBatch={9}
              windowSize={12}
            />
          </View>
          <StatusBar style="auto" backgroundColor="#1B525B" />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Homescreen;

var styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 10,
  },
});
