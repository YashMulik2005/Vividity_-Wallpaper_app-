import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { width } = Dimensions.get("window");

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loader, setloader] = useState(false);

  const handleSubmit = async () => {
    setloader(true);
    try {
      if (email.length == 0) {
      }
      if (password.length == 0) {
      }
      const res = await axios.post(
        "https://wallpaper-app-backend.vercel.app/api/user/signup",
        {
          email: email,
          password: password,
        }
      );
      console.log(res);
      if (res.status === 201) {
        router.push("/Auth/Login");
      } else {
        console.log("Failed to sign up. Please try again.");
      }
    } catch (err) {
      console.error(err);
      console.log("An error occurred during sign up.");
    }
    setloader(false);
  };

  return (
    <SafeAreaView className=" bg-primaryDark p-4 px-6 ">
      <ScrollView className="" style={styles.fullScreen}>
        <View className=" flex flex-col justify-center items-center gap-3">
          <View className=" w-full flex flex-col justify-center items-center">
            <Image
              source={require("../../assets/images/signup.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View className=" w-full h-[50%]">
            <Text className=" text-white text-xl md:text-3xl font-semibold">
              Sign Up
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
              className=" bg-buttonSecondary p-[14px] rounded-xl my-4"
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
            <Text className="  text-sm md:text-lg text-white text-center my-1">
              If already have account then
            </Text>
            <TouchableOpacity onPress={() => router.push("/Auth/Login")}>
              <Text className=" text-blue-600 text-sm md:text-xl xl:text-3xl font-semibold text-center ">
                Sign-In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar backgroundColor="#1A1A1A" style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  fullScreen: {
    height: "100%",
    width: "100%",
  },
  cardContainer: {
    margin: width * 0.01,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    width: width * 1.0,
    height: width * 1.0,
    borderRadius: 5,
  },
});
