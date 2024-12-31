import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("window");

const MainScreen = () => {
  const [prompt, setPrompt] = useState(null);

  const arr = [
    {
      _id: 1,
      url: "https://i.pinimg.com/474x/68/0e/39/680e39cf44f3aa541cf026984047aba0.jpg",
    },
    {
      _id: 2,
      url: "https://i.pinimg.com/474x/d4/63/7f/d4637fcc319e93bc682c56a30b8b08de.jpg",
    },
    {
      _id: 3,
      url: "https://i.pinimg.com/474x/98/10/8e/98108e51662ee714be049309d2fa2b8c.jpg",
    },
    {
      _id: 4,
      url: "https://i.pinimg.com/474x/a0/08/3d/a0083d5e4e7251ecd547adbbc5a2e4e3.jpg",
    },
  ];

  const passNext = async () => {
    if (!prompt) {
      Toast.show({
        type: "error",
        text1: "Propt Required",
        text2: "Please enter a prompt to proceed.",
      });
      return;
    }
    await AsyncStorage.setItem("prompt", prompt);
    router.push("/AiImage/GeneratedImage");
  };

  return (
    <LinearGradient
      colors={["#1B525B", "#3b7a8b", "#1A2433"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, height: "100%" }}>
        <View className=" m-4">
          <TextInput
            keyboardType="ascii-capable"
            className=" w-full text-sm md:text-lg xl:text-3xl text-white rounded-md p-4 px-4 bg-skeletonDark"
            placeholder="propt"
            placeholderTextColor="#ffffff"
            onChangeText={(e) => setPrompt(e)}
          />
        </View>
        <ScrollView>
          <View className="flex flex-col gap-5 mx-4 justify-center items-center h-full">
            <FlatList
              data={arr}
              renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                  <Image source={{ uri: item.url }} style={styles.image} />
                </View>
              )}
              keyExtractor={(item) => item._id.toString()}
              numColumns={2}
            />
            <TouchableOpacity onPress={passNext} className=" w-full">
              <Text className="bg-buttonSecondary w-full text-white font-semibold text-sm md:text-lg lg:text-xl 2xl:text-3xl p-3 px-4 text-center rounded-md">
                Start Generating
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Toast />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  cardContainer: {
    margin: width * 0.01,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    width: width * 0.44,
    height: width * 0.7,
    borderRadius: 5,
  },
});
