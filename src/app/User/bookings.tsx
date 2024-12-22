import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setParkingData, resetParkingData, addCompletedBooking } from "../../../Redux/parkingSlice";

const dummyData = [
  { id: "1", location: "Sector 18, Noida", price: "50", date: "15 Dec 2024" },
  { id: "2", location: "Tariq Road, Karachi", price: "70", date: "14 Dec 2024" },
  { id: "3", location: "Clifton, Karachi", price: "120", date: "12 Dec 2024" },
  { id: "4", location: "DHA 5, Karachi", price: "100", date: "10 Dec 2024" },
  { id: "5", location: "North Nazimabad, Karachi", price: "80", date: "9 Dec 2024" },
  { id: "6", location: "Clifton, Karachi", price: "220", date: "3 Dec 2024" },
];

export default function BookingScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const parkingData = useSelector((state) => state.parking); // Access active booking
  const completedBookings = useSelector((state) => state.parking.completedBookings);

  const [showCompleted, setShowCompleted] = useState(false);
  const [newlyCompletedBooking, setNewlyCompletedBooking] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());

      if (parkingData.startTime && parkingData.endTime) {
        const endTime = new Date(parkingData.endTime);
        if (currentTime >= endTime) {
          handleStopParking(); // Stop parking automatically if end time reached
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTime, parkingData]);

  const handleStopParking = () => {
    const completedBooking = {
      id: new Date().getTime(),
      location: parkingData.location,
      name: parkingData.name,
      price: parkingData.price,
      slot: parkingData.slot,
      startTime: parkingData.startTime,
      endTime: parkingData.endTime,
      date: new Date().toLocaleDateString(),
    };

    setNewlyCompletedBooking(completedBooking); // Save locally for the Completed UI
    dispatch(addCompletedBooking(completedBooking)); // Save to Redux
    dispatch(resetParkingData()); // Clear active booking

    setShowCompleted(true); // Show Completed UI
  };

  const handleEndParking = () => {
    // Navigate to Wallet and reset newly completed booking
    navigation.navigate("Wallet");
    setShowCompleted(false); // Reset Complete UI
    setNewlyCompletedBooking(null); // Clear local completed booking data
  };

  const renderCompletedUI = () => (
    <View style={styles.container}>
      <Text style={styles.carModel}>{newlyCompletedBooking?.name || "N/A"}</Text>
      <Text style={styles.carDescription}>
        Parking Location: {newlyCompletedBooking?.location || "N/A"}
      </Text>
      <Text style={styles.priceText}>
        Price: ${newlyCompletedBooking?.price || 0}
      </Text>
      <View style={styles.completedStatus}>
        <Text style={styles.completedText}>Completed</Text>
      </View>
      <Image source={require("../../Images/car1.png")} style={styles.carImage} />
      <TouchableOpacity
        style={styles.stopButton}
        onPress={handleEndParking}
      >
        <Text style={styles.stopButtonText}>End Parking</Text>
      </TouchableOpacity>
    </View>
  );

  const renderActiveBooking = () => {
    const progress = Math.min(
      ((currentTime - new Date(parkingData.startTime)) /
        (new Date(parkingData.endTime) - new Date(parkingData.startTime))) *
        100,
      100
    );

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.carModel}>{parkingData.name || "N/A"}</Text>
          <Text style={styles.carDescription}>
            Parking Location: {parkingData.location || "N/A"}
          </Text>
          <Text style={styles.priceText}>Price: Rs {parkingData.price || 0} /hr</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.carImageContainer}>
            <Image
              source={require("../../Images/car1.png")}
              style={styles.carImage}
            />
            <View
              style={[
                styles.greenOverlay,
                { height: `${progress}%` },
              ]}
            >
              <Text style={styles.overlayText}>
                {progress === 100 ? "Done" : "In Progress"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            Slot Number: {parkingData.slot || "N/A"}
          </Text>
          <Text style={styles.timerText}>
            Start Time: {parkingData.startTime || "N/A"}
          </Text>
          <Text style={styles.timerText}>
            End Time: {parkingData.endTime || "N/A"}
          </Text>
        </View>
        <TouchableOpacity style={styles.stopButton} onPress={handleStopParking}>
          <Text style={styles.stopButtonText}>Stop</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPreviousBookings = () => (
    <FlatList
      data={[...completedBookings, ...dummyData]} // Combine completed bookings and dummy data
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.bookingItem}>
          <Text style={styles.bookingText}>{item.location}</Text>
          <Text style={styles.bookingText}>{item.date}</Text>
          <Text style={styles.bookingText}>Rs {item.price}</Text>
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );

  if (showCompleted) return renderCompletedUI();
  if (parkingData.startTime && parkingData.endTime) return renderActiveBooking();
  return renderPreviousBookings();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
    alignItems: "center",
    paddingTop: 50,
  },
  listContainer: {
    backgroundColor: "black",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  carModel: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  carDescription: {
    fontSize: 16,
    color: "gray",
    marginVertical: 5,
  },
  priceText: {
    fontSize: 18,
    color: "white",
  },
  completedStatus: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  completedText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressContainer: {
    marginVertical: 20,
    width: "80%",
    height: 150,
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  carImageContainer: {
    position: "relative",
  },
  carImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    zIndex: 1,
  },
  greenOverlay: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "green",
    width: "100%",
    height: "0%",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    zIndex: 2,
  },
  timerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  bookingItem: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    gap: 10,
  },
  bookingText: {
    flex: 1,
    marginVertical: 2,
    fontSize: 12,
    color: "black",
  },
  stopButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 20,
  },
  stopButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
