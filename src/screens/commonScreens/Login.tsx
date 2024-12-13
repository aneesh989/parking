import React, { useState } from "react";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Headerx from "../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../commons/Colors";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("userdata", JSON.stringify(value));
      console.log("Stored user data:", value);
    } catch (e) {
      console.error("Error storing data", e);
    }
  };

  const handleClick = async () => {
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }

    try {
      // const response = await axios.post(`${url}api/authenticate`, {
      //   username: email,
      //   password: password,
      // });
      const response = {
      data: {
        token: "mocked_token",
        id: "mocked_user_id",
        role: {
          id: 1, // Change this based on which role you want to test
        },
      },
    };

      // if (response.data === "User not found") {
      //   alert("User not found!");
      //   return;
      // }

      if (response.data.token) {
        setEmail("");
        setPassword("");
        await storeData(response.data.id);

        if (response.data.role) {
          if (response.data.role.id === 1) {
            navigation.navigate("HostDrawer"); // Host role
          } else {
            navigation.navigate("Drawer"); // User role
          }
        } else {
          alert("Something went wrong");
        }
      } else {
        alert("Unexpected response: " + response.data);
      }
    } catch (error) {
      alert(
        error.response?.status === 404 ? "Invalid Credentials" : error.message
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Headerx navigation={navigation} headerName="Login" />
      <View style={styles.container}>
        <Text style={styles.title}>LOGIN</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Email"
            placeholderTextColor={colors.themeColor}
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your Password"
            placeholderTextColor={colors.themeColor}
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={handleClick}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("SignUpOptions")}>
          <Text>
            or <Text style={styles.SignUp}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  title: {
    paddingHorizontal: 10,
    color: colors.themeColor,
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 30,
  },
  inputView: {
    backgroundColor: colors.lightgray,
    borderRadius: 5,
    width: SCREEN_WIDTH / 1.2,
    height: SCREEN_HEIGHT / 15,
    marginBottom: 30,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  TextInput: {
    height: SCREEN_HEIGHT / 15,
    color: colors.themeColor,
    padding: SCREEN_HEIGHT / 50,
  },
  linkText: {
    color: colors.themeColor,
  },
  loginBtn: {
    width: "70%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
    marginTop: 20,
    backgroundColor: colors.themeColor,
  },
  loginText: {
    color: colors.white,
  },
  SignUp: {
    color: colors.themeColor,
  },
});

export default Login;
