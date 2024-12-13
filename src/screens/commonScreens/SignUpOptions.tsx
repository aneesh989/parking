import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React from "react";
import colors from "../../commons/Colors";
import Headerx from "../../components/header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SignUpOptions = ({ navigation }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <Headerx navigation={navigation} headerName={"Sign Up Options"} />
        <Text
          style={{
            flex: 0.2,
            fontSize: SCREEN_WIDTH / 19,
            color: colors.black,
            fontWeight: "500",
            textAlign: "center",
            top: SCREEN_WIDTH / 7,
          }}
        >
          Who are{" "}
          <Text
            style={{
              color: colors.themeColor,
              fontWeight: "bold",
              fontSize: SCREEN_WIDTH / 11,
            }}
          >
            {" "}
            YOU?
          </Text>{" "}
        </Text>
        <View style={{ flex: 0.5, justifyContent: "space-between" }}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <View style={homecardstyles.container}>
              <Image
                resizeMode="contain"
                source={require("../../Images/host.png")}
                borderTopLeftRadius={15}
                borderTopRightRadius={15}
                style={homecardstyles.image}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: colors.themeColor,
            }}
          >
            PARKING HOST
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("GuestSignUp")}>
            <View style={homecardstyles.container2}>
              <Image
                resizeMode="contain"
                source={require("../../Images/spaceuser.png")}
                borderTopLeftRadius={15}
                borderTopRightRadius={15}
                style={homecardstyles.image}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: colors.themeColor,
            }}
          >
            SPACE USER
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignUpOptions;

const homecardstyles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 2,
    borderRadius: 15,
    flexDirection: "row",

    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginHorizontal: SCREEN_WIDTH / 46,

    alignSelf: "center",

    justifyContent: "center",
  },
  container2: {
    width: SCREEN_WIDTH / 2,
    borderRadius: 15,
    flexDirection: "row",

    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginHorizontal: SCREEN_WIDTH / 46,

    alignSelf: "center",

    justifyContent: "center",
  },
  title: {
    color: colors.black,
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "bold",
  },
  bodyContainer: {
    marginTop: SCREEN_HEIGHT / 67,
    marginLeft: SCREEN_WIDTH / 31,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT / 135,
  },
  deliveryText: {
    marginLeft: SCREEN_WIDTH / 75,
  },
  rateContainer: {
    position: "absolute",
    top: SCREEN_HEIGHT / 81,
    left: SCREEN_WIDTH / 34,
  },
  favoriteContainer: {
    position: "absolute",
    top: SCREEN_HEIGHT / 81,
    right: SCREEN_WIDTH / 34,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SCREEN_HEIGHT / 50,
  },
  card: {
    marginLeft: SCREEN_WIDTH / 47,
  },
  image: {
    height: SCREEN_HEIGHT / 6,
    width: SCREEN_WIDTH / 2,
  },
});
const categorycardstyles = StyleSheet.create({
  container: {
    backgroundColor: colors.purple,
    borderRadius: 5,
    alignItems: "center",

    justifyContent: "center",
    paddingHorizontal: SCREEN_WIDTH / 53,
    paddingVertical: SCREEN_HEIGHT / 116,
  },
  title: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "bold",
  },
});
