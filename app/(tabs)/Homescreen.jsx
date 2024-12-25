import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
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

const Homescreen = () => {
  const [Category, setCategory] = useState([]);
  const [tranding, settranding] = useState([]);
  const [wallpaers, setwallpaers] = useState([]);
  // const [currentPage, setcurrentPage] = useState(1);
  // const [hasMore, sethasMore] = useState(true);
  const [loading, setloading] = useState(false);
  const [categoryLoader, setcategoryLoader] = useState(false);
  const [moreloader, setmoreloader] = useState(false);
  // const [link, setlink] = useState(null);
  // const [lastlink, setlastlink] = useState(null);

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
    console.log("in api");
    setloading(true);
    const res = await axios.get(
      `https://wallpaper-app-backend.vercel.app/api/wallpaper/wallpapers`
    );
    console.log(res);
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

  useEffect(() => {
    getCategories();
    getTranding();
    getWallpapers();
  }, []);

  return (
    <LinearGradient
      colors={["#1B525B", "#3b7a8b", "#1A2433"]}
      className="h-full w-full px-3"
    >
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className=" pt-2">
            <Text className="text-white text-xl font-semibold mx-2">
              Trending
            </Text>
            <FlatList
              data={tranding}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/wallpaper/${item._id}`);
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    className="w-28 h-44 rounded-md mx-2 object-cover"
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          </View>

          <View className="">
            <View className=" flex flex-row justify-between items-center w-full">
              <Text className="text-white text-xl font-semibold mx-2">
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
            <View className="bg-buttonSecondary w-1/2 rounded-md py-2">
              <Text className="text-white text-center text-xl">
                New Wallpapers{" "}
                <FontAwesome5 name={"fire"} size={15} color="#00F798" />
              </Text>
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
