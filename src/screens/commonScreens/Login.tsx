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
  const [rememberMe, setRememberMe] = useState(false);

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
      const response = {
        data: {
          token: "mocked_token",
          id: "mocked_user_id",
          role: { id: 2 },
        },
      };

      if (response.data.token) {
        setEmail("");
        setPassword("");
        await storeData(response.data.id);

        if (response.data.role) {
          if (response.data.role.id === 1) {
            navigation.navigate("HostDrawer");
          } else {
            navigation.navigate("Drawer");
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
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Email"
            placeholderTextColor={colors.white}
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
        </View>
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

        <View style={styles.rememberMeContainer}>
          <Text style={styles.rememberMeText}>Remember me</Text>
          <TouchableOpacity onPress={() => navigation.push("ForgetPassword")}>
            <Text style={styles.forgotPassword}>Forget password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleClick}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

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
