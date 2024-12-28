import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  BackHandler,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loader, setloader] = useState(false);

  const handleSubmit = async () => {
    setloader(true);
    try {
      if (email.length == 0 || password.length == 0) {
        Alert.alert("Error", "Email and password are required.");
        return;
      }
      const res = await axios.post(
        "https://wallpaper-app-backend.vercel.app/api/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(res);
      console.log(res.data.token);
      if (res.status === 200) {
        await AsyncStorage.setItem("token", res?.data?.token);
        const data = await axios.get(
          "https://wallpaper-app-backend.vercel.app/api/user/user",
          {
            headers: {
              Authorization: res?.data?.token,
            },
          }
        );

        await AsyncStorage.setItem("user", JSON.stringify(data?.data?.user));
        router.push("/(tabs)/Homescreen");
      } else {
        console.log("email or password is wrong");
      }
    } catch (err) {
      console.error(err);
      console.log("An error occurred during login.");
    }
    setloader(false);
  };

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

  return (
    <SafeAreaView className=" bg-primaryDark p-4 px-6 ">
      <ScrollView className="" style={styles.fullScreen}>
        <View className=" flex flex-col justify-center items-center gap-3">
          <View className=" w-full flex flex-col justify-center items-center">
            <Image
              source={require("../../assets/images/login.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View className=" w-full h-[50%] flex justify-center items-center">
            <View className=" h-full w-full">
              <Text className=" text-white  text-xl md:text-3xl font-semibold">
                Sign In
              </Text>
              <Text className=" text-white text-sm md:text-lg xl:text-3xl my-2">
                Email
              </Text>
              <TextInput
                keyboardType="email-address"
                className=" border w-full text-sm md:text-lg text-white rounded-xl px-4 border-gray-600"
                placeholder="email"
                placeholderTextColor="#ffffff"
                onChangeText={(e) => setemail(e)}
              />
              <Text className=" text-white text-sm md:text-lg xl:text-3xl my-2">
                Password
              </Text>
              <TextInput
                keyboardType="ascii-capable"
                className=" border w-full text-sm md:text-lg text-white rounded-xl px-4 border-gray-600"
                placeholder="password"
                placeholderTextColor="#ffffff"
                secureTextEntry={true}
                onChangeText={(e) => setpassword(e)}
              />
              <TouchableOpacity
                className=" bg-buttonSecondary p-[12px] rounded-xl my-4"
                onPress={handleSubmit}
              >
                {loader ? (
                  <ActivityIndicator size="large" color="#ffffff" />
                ) : (
                  <Text className=" text-white text-sm md:text-lg xl:text-xl 2xl:text-3xl font-bold text-center">
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>
              <Text className=" text-sm md:text-lg text-white text-center my-1">
                Or Don't have an account? Then
              </Text>
              <TouchableOpacity onPress={() => router.push("/Auth/Signup")}>
                <Text className=" text-blue-600 text-sm md:text-xl xl:text-3xl font-semibold text-center ">
                  Sign-Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <StatusBar backgroundColor="#1A1A1A" style="white" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  fullScreen: {
    height: "100%",
    width: "100%",
  },
  image: {
    width: width * 0.9,
    height: height * 0.45,
  },
});
