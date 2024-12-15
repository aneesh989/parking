import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import { setParkingData } from "../../../Redux/parkingSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  SafeAreaView,
} from "react-native";

const GarageApp = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const parkingData = useSelector((state: any) => state.parking); // Access parking data from Redux

  const [sections, setSections] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  // Time management
  const [startTime, setStartTime] = useState(getCurrentTime());
  const [endTime, setEndTime] = useState("");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  useEffect(() => {
    const generatedSections = generateSections();
    setSections(generatedSections);
    autoSelectFirstAvailableSlot(generatedSections); // Automatically select first available slot
  }, []);

  // Generate sections and slots dynamically
  function generateSections() {
    const sectionLabels = ["A", "B", "C", "D"];
    return sectionLabels.map((label) => ({
      label,
      slots: Array.from({ length: 12 }, (_, index) => ({
        id: `${label}-${index + 1}`,
        name: `Slot ${label}-${index + 1}`,
        available: Math.random() > 0.3, // Random availability
      })),
    }));
  }

  // Automatically select the first available slot
  const autoSelectFirstAvailableSlot = (sections: any) => {
    for (const section of sections) {
      const availableSlot = section.slots.find((slot: any) => slot.available);
      if (availableSlot) {
        setSelectedSlot(availableSlot);
        setCheckoutVisible(true); // Show booking confirmation
        break;
      }
    }
  };

  // Get current time in "hh:mm AM/PM" format
  function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  }

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = () => setTimePickerVisible(false);

  const handleConfirmTime = (time: Date) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;
    setEndTime(formattedTime);
    hideTimePicker();
  };

  const handleBooking = () => {
    if (!endTime) {
      alert("Please select an end time");
      return;
    }

    // Update Redux with the selected slot and times
    dispatch(
      setParkingData({
        ...parkingData, // Keep existing data (location, price, etc.)
        slot: selectedSlot?.name,
        startTime,
        endTime,
      })
    );

    setCheckoutVisible(false);
    navigation.navigate("Booking"); // Navigate to Booking page
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Garage Slots</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Parking Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Location: {parkingData.location}</Text>
        <Text style={styles.detailText}>Name: {parkingData.name}</Text>
        <Text style={styles.detailText}>Price: ₹ {parkingData.price} /hr</Text>
      </View>

      {/* Confirm Booking Slide */}
      {checkoutVisible && selectedSlot && (
        <View style={styles.bookingSlide}>
          <Text style={styles.confirmTitle}>Confirm Booking</Text>
          <Text style={styles.confirmDetail}>Slot: {selectedSlot?.name}</Text>
          <Text style={styles.confirmDetail}>Start Time: {startTime}</Text>
          <TouchableOpacity
            onPress={showTimePicker}
            style={styles.timePickerButton}
          >
            <Text style={styles.confirmDetail}>
              End Time: {endTime || "Select End Time"}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
          />

          <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
  },
  bookingSlide: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5,
    alignItems: "center",
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  confirmDetail: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  timePickerButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  bookButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  bookText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default GarageApp;
