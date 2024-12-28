import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import SinglePageSkeleton from "../../components/SinglePageSkeleton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const SingleWallpaper = () => {
  const route = useRoute();
  const { id } = route.params;
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(false);
  const [like, setlike] = useState(false);

  const getdata = async () => {
    setloader(true);
    const token = await AsyncStorage.getItem("token");
    const res = await axios.get(
      `https://wallpaper-app-backend.vercel.app/api/wallpaper/wallpapers/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setdata(res?.data);
    setlike(res?.data?.favorite);
    setloader(false);
  };

  // const handleFavorite = async () => {
  //   console.log(like);
  //   const token = await AsyncStorage.getItem("token");
  //   if (!like) {
  //     setlike(false);
  //     const res = await axios.post(
  //       `https://wallpaper-app-backend.vercel.app/api/Favourite/favourites`,
  //       {
  //         wallpaperId: id,
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     console.log("like api", res);
  //   } else {
  //     setlike(true);
  //     console.log("dislike");

  //     const res = await axios.post(
  //       `https://wallpaper-app-backend.vercel.app/api/Favourite/favourites/remove`,
  //       {
  //         wallpaperId: id,
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     console.log("dislike api", res);
  //   }
  // };

  const downloadImage = async () => {
    if (!data.image) {
      Alert.alert("Error", "Image not available for download.");
      return;
    }

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Storage permission is required to download the image."
        );
        return;
      }

      const downloadUri = data.image;
      const fileName = downloadUri.split("/").pop();
      const fileUri =
        Platform.OS === "android"
          ? `${FileSystem.documentDirectory}${fileName}`
          : `${FileSystem.cacheDirectory}${fileName}`;

      const { uri } = await FileSystem.downloadAsync(downloadUri, fileUri);
      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync("Download");

      if (album == null) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert("Download Complete", "Image saved to the Downloads folder.");
    } catch (error) {
      Alert.alert("Download Error", "Failed to download the image.");
      console.error(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <LinearGradient
      colors={["#1B525B", "#3b7a8b", "#1A2433"]}
      className="h-full w-full px-6"
    >
      {loader ? (
        <SinglePageSkeleton />
      ) : (
        <SafeAreaView className="flex flex-col gap-2 justify-center">
          <View className="flex flex-row justify-between pr-4 items-center">
            <Text className="text-white text-lg md:text-3xl font-semibold">
              {data?.wallpaper?.category?.name}
            </Text>
            {/* <TouchableOpacity onPress={handleFavorite}>
              <Ionicons
                name={like ? "heart" : "heart-outline"}
                size={25}
                color="#ffffff"
              />
            </TouchableOpacity> */}
          </View>
          <Image
            source={{ uri: data?.wallpaper?.image }}
            className="max-h-full h-[85%] rounded-xl"
          />
          <TouchableOpacity onPress={downloadImage}>
            <Text className="text-black text-center py-[8px] rounded-md font-bold text-sm md:text-lg lg:text-xl xl:text-3xl bg-offwhite">
              Download
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </LinearGradient>
  );
};

export default SingleWallpaper;
