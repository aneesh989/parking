import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const dummyData = [
  { id: "1", location: "Sector 18, Noida", price: "50", date: "15 Dec 2024" },
  { id: "2", location: "Tariq Road, Karachi", price: "70", date: "14 Dec 2024" },
  { id: "3", location: "Clifton, Karachi", price: "120", date: "12 Dec 2024" },
  { id: "4", location: "DHA 5, Karachi", price: "100", date: "10 Dec 2024" },
  { id: "5", location: "North Nazimabad, Karachi", price: "80", date: "9 Dec 2024" },
  { id: "6", location: "Clifton, Karachi", price: "220", date: "3 Dec 2024" },
];

function getCurrentTime() {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
}

export default function BookingScreen() {
  const bookingData = useSelector((state) => state.parking);
  const [progressHeight, setProgressHeight] = useState("0%");
  const [buttonText, setButtonText] = useState("Stop");
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const navigation = useNavigation();

  const updateProgress = () => {
    if (bookingData?.startTime && bookingData?.endTime) {
      const startTime = new Date(bookingData.startTime).getTime();
      const endTime = new Date(bookingData.endTime).getTime();
      const totalDuration = endTime - startTime;
      const elapsed = Math.max(currentTime - startTime, 0);

      const progress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgressHeight(`${progress}%`);

      if (currentTime >= endTime) {
        setButtonText("Complete");
      } else {
        setButtonText("Stop");
      }
    } else {
      setProgressHeight("0%");
      setButtonText("Stop");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    updateProgress();
  }, [currentTime, bookingData]);

  if (!bookingData || !bookingData.startTime || !bookingData.endTime) {
    return (
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
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
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.carModel}>{bookingData.name || "N/A"}</Text>
        <Text style={styles.carDescription}>
          Parking Location: {bookingData.location || "N/A"}
        </Text>
        <Text style={styles.priceText}>Price: Rs {bookingData.price || 0} /hr</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.carImageContainer}>
          <Image
            source={require("../../Images/car1.png")}
            style={styles.carImage}
          />
          <View
            style={[styles.greenOverlay, { height: progressHeight }]}>
            <Text style={styles.overlayText}>{currentTime >= new Date(bookingData.endTime).getTime() ? 'Done' : 'In Progress'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          Slot Number: {bookingData.slot || "N/A"}
        </Text>
        <Text style={styles.timerText}>
          Start Time: {bookingData.startTime || "N/A"}
        </Text>
        <Text style={styles.timerText}>
          End Time: {bookingData.endTime || "N/A"}
        </Text>
      </View>

      <TouchableOpacity style={styles.stopButton} onPress={() => navigation.navigate("Wallet")}>
        <Text style={styles.stopButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    gap:10,
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
