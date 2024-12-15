import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux"; // Import useDispatch
import { setParkingData } from "../../../Redux/parkingSlice"; // Import Redux action
import colors from "../../commons/Colors";

export default function ParkingApp() {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Initialize dispatch
  const [selectedVehicle, setSelectedVehicle] = useState("Car");
  const [searchQuery, setSearchQuery] = useState("");


  const parkingData = [
    {
      id: '1',
      name: 'Freeway Park Garage',
      location: 'Clifton, Karachi',
      price: 100,
      availability: '20 spots',
      image: require('../../Images/ParkingSpots/1.jpg'),      // Local image
    },
    {
      id: '2',
      name: 'WSCC Main Garage',
      location: 'DHA 5, Karachi',
      price: 150,
      availability: '15 spots',
      image: require('../../Images/ParkingSpots/2.webp'), // Local image
    },
    {
      id: '3',
      name: 'Parking Area N28',
      location: 'North Nazimabad, Karachi',
      price: 80,
      availability: '25 spots',
      image: require('../../Images/ParkingSpots/3.webp'), // Local image
    },
    {
      id: '4',
      name: 'City Mall Parking',
      location: 'Gulshan-e-Iqbal, Karachi',
      price: 120,
      availability: '18 spots',
      image: require('../../Images/ParkingSpots/4.webp'), // Local image
    },
    {
      id: '5',
      name: 'Hyperstar Parking',
      location: 'DHA 5, Karachi',
      price: 90,
      availability: '22 spots',
      image: require('../../Images/ParkingSpots/5.webp'), // Local image
    },
    {
      id: '6',
      name: 'Mall of Karachi Parking',
      location: 'Tariq Road, Karachi',
      price: 130,
      availability: '10 spots',
      image: require('../../Images/ParkingSpots/6.webp'), // Local image
    },
    {
      id: '7',
      name: 'Clifton Beach Parking',
      location: 'Clifton, Karachi',
      price: 110,
      availability: '30 spots',
      image: require('../../Images/ParkingSpots/7.webp'), // Local image
    },
    {
      id: '8',
      name: 'Shahrah-e-Faisal Parking',
      location: 'Shahrah-e-Faisal, Karachi',
      price: 140,
      availability: '12 spots',
      image: require('../../Images/ParkingSpots/8.webp'), // Local image
    },
    {
      id: '9',
      name: 'Korangi Industrial Parking',
      location: 'Korangi, Karachi',
      price: 100,
      availability: '20 spots',
      image: require('../../Images/ParkingSpots/2.webp'), // Local image
    },
    {
      id: '10',
      name: 'Nazimabad Parking Lot',
      location: 'Nazimabad, Karachi',
      price: 85,
      availability: '28 spots',
      image: require('../../Images/ParkingSpots/1.jpg'), // Local image
    },
  ];
   

  const calculatePrice = (price) => {
    switch (selectedVehicle) {
      case "Bike":
        return price / 2;
      case "Van":
        return price * 2;
      case "Scooter":
        return price / 2;
      default:
        return price;
    }
  };

  const filteredData = parkingData.filter(
    (item) =>
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleParkingSelection = (item) => {
    const parkingDetails = {
      name: item.name,
      location: item.location,
      price: calculatePrice(item.price),
      availability: item.availability,
    };

    // Dispatch parking data to Redux store
    dispatch(setParkingData(parkingDetails));

    // Navigate to Garage page
    navigation.navigate("Garage");
  };

  const renderParkingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.parkingItem}
      onPress={() => handleParkingSelection(item)} // Call handleParkingSelection
    >
      <Image source={{ uri: item.image }} style={styles.parkingImage} />
      <View style={styles.parkingDetails}>
        <Text style={styles.parkingName}>{item.name}</Text>
        <Text style={styles.parkingLocation}>{item.location}</Text>
        <Text style={styles.parkingPrice}>
          ₹ {calculatePrice(item.price)} /hr
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../Images/avtar.png")}
          style={styles.profileImage}
        />
        <Text style={styles.greeting}>Good Morning, Anish</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      <Text style={styles.title}>Find the best place to park</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Vehicle Selection */}
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setSelectedVehicle("Car")}
        >
          <FontAwesome5
            name="car"
            size={20}
            color={selectedVehicle === "Car" ? colors.themeColor : "gray"}
          />
          <Text style={styles.iconLabel}>Car</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setSelectedVehicle("Bike")}
        >
          <FontAwesome5
            name="bicycle"
            size={20}
            color={selectedVehicle === "Bike" ? colors.themeColor : "gray"}
          />
          <Text style={styles.iconLabel}>Bike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setSelectedVehicle("Van")}
        >
          <FontAwesome5
            name="truck"
            size={20}
            color={selectedVehicle === "Van" ? colors.themeColor : "gray"}
          />
          <Text style={styles.iconLabel}>Van</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setSelectedVehicle("Scooter")}
        >
          <FontAwesome5
            name="motorcycle"
            size={20}
            color={selectedVehicle === "Scooter" ? colors.themeColor : "gray"}
          />
          <Text style={styles.iconLabel}>Scooter</Text>
        </TouchableOpacity>
      </View>

      {/* Parking Nearby List */}
      <Text style={styles.sectionTitle}>Parking Nearby</Text>
      <FlatList
        data={filteredData}
        renderItem={renderParkingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    padding: 14,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  iconButton: {
    alignItems: "center",
  },
  iconLabel: {
    marginTop: 5,
    color: "#555",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  listContainer: {
    paddingBottom: 80,
  },
  parkingItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    elevation: 2,
  },
  parkingImage: {
    width: 100,
    height: 100,
  },
  parkingDetails: {
    flex: 1,
    padding: 10,
  },
  parkingName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  parkingLocation: {
    color: "#555",
    marginVertical: 5,
  },
  parkingPrice: {
    color: colors.themeColor,
    fontWeight: "bold",
  },
  bottomTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5,
  },
});
