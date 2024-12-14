import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Headerx from "../../components/header";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function GuestSignUp({ navigation }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    // Validation
    if (name === "" || number === "" || email === "" || password === "") {
      alert("Please fill all the fields");
      return false;
    } else {
      // Replace 'url' with your actual API endpoint
      axios
        .post(url + "api/register", {
          name: name,
          emailAddress: email,
          password: password,
          phoneNumber: number,
          role: {
            id: 2,
            name: "Customer",
          },
        })
        .then((response) => {
          if (response.data === "User already exists") {
            alert("Email Address already registered!");
          } else {
            alert("Registration Successful!");
            navigation.navigate("Login");
          }
        })
        .catch((error) => alert("Something went wrong: " + error));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Headerx navigation={navigation} headerName="Sign Up" />

      <View style={styles.container}>
        <Text style={styles.title}>Register as a Rent Men</Text>

        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Name"
            placeholderTextColor="#ccc"
            onChangeText={(value) => setName(value)}
            value={name}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Contact Number</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Contact Number"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            onChangeText={(value) => setNumber(value)}
            value={number}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Password"
            placeholderTextColor="#ccc"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>

        <TouchableOpacity style={styles.signUpBtn} onPress={handleClick}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.footerText}>
            Already registered? <Text style={styles.loginText}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 30,
  },
  inputView: {
    width: "100%",
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
  signUpBtn: {
    backgroundColor: "#0ea5e9",
    borderRadius: 30,
    height: 50,
    width: SCREEN_WIDTH / 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    color: "#ffffff",
    fontSize: 14,
    marginTop: 30,
  },
  loginText: {
    color: "#0ea5e9",
    fontWeight: "bold",
  },
});
