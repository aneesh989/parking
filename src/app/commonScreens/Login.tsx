import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../Redux/UserSlice"; // Redux action
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dataset from "./dataset"; 
import colors from "../commons/Colors";
import Headerx from "../../components/header";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("userdata", JSON.stringify(value));
      console.log("Stored user data:", value);
    } catch (e) {
      console.error("Error storing data", e);
    }
  };

  const validateCredentials = () => {
    const allUsers = [...dataset.users, ...dataset.hosts];
    return allUsers.find(
      (user) =>
        user.username.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password.trim()
    );
  };

  const handleClick = async () => {
    if (email === "" || password === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
      return;
    }

    const user = validateCredentials();

    if (user) {
      // Save data to AsyncStorage and Redux
      const userData = { 
        name: user.name, 
        role: user.role, 
        email: user.username, 
        wallet: user.wallet 
      };
      await storeData(userData);
      dispatch(setUserData(userData));

      // Navigate based on role
      if (user.role === "host") {
        navigation.navigate("HostHome");
      } else if (user.role === "user") {
        navigation.navigate("Home");
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid Credentials",
        text2: "Email or password is incorrect",
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Headerx navigation={navigation} headerName="Login" />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        {/* Email Input */}
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Email"
            placeholderTextColor={colors.white}
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your Password"
            placeholderTextColor={colors.white}
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>

        {/* Remember Me & Forgot Password */}
        <View style={styles.rememberMeContainer}>
          <Text style={styles.rememberMeText}>Remember me</Text>
          <TouchableOpacity onPress={() => navigation.push("ForgetPassword")}>
            <Text style={styles.forgotPassword}>Forget password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleClick}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Sign Up Option */}
        <TouchableOpacity onPress={() => navigation.push("SignUpOptions")}>
          <Text style={styles.footerText}>
            Don’t have an account? <Text style={styles.signupText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 10,
  },
  subtitle: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 30,
  },
  inputView: {
    width: SCREEN_WIDTH / 1.2,
    marginBottom: 20,
  },
  inputLabel: {
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  TextInput: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    height: 50,
    paddingHorizontal: 15,
    color: "#000000",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH / 1.2,
    marginBottom: 20,
  },
  rememberMeText: {
    color: "#ffffff",
    marginLeft: 8,
  },
  forgotPassword: {
    color: "#ffffff",
    textDecorationLine: "underline",
  },
  loginBtn: {
    backgroundColor: "#0ea5e9",
    borderRadius: 30,
    height: 50,
    width: SCREEN_WIDTH / 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    color: "#ffffff",
    fontSize: 14,
  },
  signupText: {
    color: "#0ea5e9",
    fontWeight: "bold",
  },
});

export default Login;
