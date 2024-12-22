import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const name = useSelector((state:any) => state.user.name);
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={20} color="#fff" style={styles.backIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Icon name="cog" size={20} color="#fff" style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <Image
             source={require("../../Images/avtar.png")}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIconContainer}>
          <Icon name="pencil" size={15} color="#fff" style={styles.editIcon} />
        </TouchableOpacity>
        <Text style={styles.profileName}>{name}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Email</Text>
        <View style={styles.inputWrapper}>
          <Icon name="envelope" size={16} color="#fff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={`${name}@gmail.com`}
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputWrapper}>
          <Icon name="phone" size={16} color="#fff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="+923332513989"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.label}>Website</Text>
        <View style={styles.inputWrapper}>
          <Icon name="globe" size={16} color="#fff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="www.gfx.com"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={16} color="#fff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="xxx@gmail.com"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={()=>{navigation.navigate("Login")}}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backIcon: {
    padding: 10,
  },
  settingsIcon: {
    padding: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#333",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 120,
    backgroundColor: "#0192b1",
    borderRadius: 20,
    padding: 5,
  },
  profileName: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  profileSubtitle: {
    fontSize: 14,
    color: "#999",
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    color: "#fff",
    marginBottom: 5,
    marginTop: 15,
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "#0192b1",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 30,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
