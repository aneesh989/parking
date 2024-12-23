import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ProgressBar } from "react-native-paper";

const dummyBookings = Array.from({ length: 100 }, (_, index) => {
  const locations = [
    "Clifton, Karachi",
    "DHA, Lahore",
    "North Nazimabad, Karachi",
    "Bahria Town, Islamabad",
    "Model Town, Lahore",
    "Gulberg, Lahore",
    "F-10, Islamabad",
    "Saddar, Karachi",
  ];

  const names = ["Ali Ahmed", "Sara Khan", "Usman Tariq", "Ayesha Malik", "Zain Qureshi", "Fatima Noor", "Hamza Shah", "Maryam Javed"];

  const location = locations[Math.floor(Math.random() * locations.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  const price = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 3)); // Randomly set today, yesterday, or a previous date
  const startTime = `${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() > 0.5 ? "AM" : "PM"}`;
  const endTime = `${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() > 0.5 ? "AM" : "PM"}`;
  const hours = Math.floor(Math.random() * 5) + 1;
  const numberPlate = `ABC-${Math.floor(Math.random() * 9000) + 1000}`;
  const carModel = `Model ${Math.floor(Math.random() * 2025)}`;

  return {
    id: index.toString(),
    location,
    name,
    price,
    date: date,
    startTime,
    endTime,
    hours,
    numberPlate,
    carModel,
    completed: Math.random() > 0.5, // Randomly set completed bookings
  };
});

export default function HostBookingPage() {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filterBookingsByDate = (daysAgo) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - daysAgo);
    return dummyBookings.filter(
      (booking) => booking.date.toDateString() === targetDate.toDateString()
    );
  };

  const sortBookings = (bookings) => {
    return bookings.sort((a, b) => a.date - b.date || a.startTime.localeCompare(b.startTime));
  };

  const calculateProgress = (bookings) => {
    return bookings.length / dummyBookings.length;
  };

  const renderBookingDetails = () => (
    <View style={styles.detailsContainer}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setSelectedBooking(null)}
      >
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.detailText}>Name: {selectedBooking.name}</Text>
      <Text style={styles.detailText}>Location: {selectedBooking.location}</Text>
      <Text style={styles.detailText}>Price: Rs {selectedBooking.price}</Text>
      <Text style={styles.detailText}>Date: {selectedBooking.date.toDateString()}</Text>
      <Text style={styles.detailText}>Start Time: {selectedBooking.startTime}</Text>
      <Text style={styles.detailText}>End Time: {selectedBooking.endTime}</Text>
      <Text style={styles.detailText}>Number of Hours: {selectedBooking.hours}</Text>
      <Text style={styles.detailText}>Car Model: {selectedBooking.carModel}</Text>
      <Text style={styles.detailText}>Number Plate: {selectedBooking.numberPlate}</Text>
    </View>
  );

  const renderBookingList = (data, title, progress, style) => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, style]}>{title}</Text>
      <ProgressBar
        progress={progress}
        color="#0192b1"
        style={styles.progressBar}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.bookingItem, style]}
            onPress={() => setSelectedBooking(item)}
          >
            <Text style={styles.bookingText}>Location: {item.location}</Text>
            <Text style={styles.bookingText}>Customer: {item.name}</Text>
            <Text style={styles.bookingText}>Date: {item.date.toDateString()}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );

  if (selectedBooking) return renderBookingDetails();

  const todayBookings = sortBookings(filterBookingsByDate(0));
  const yesterdayBookings = sortBookings(filterBookingsByDate(1));
  const activeBookings = sortBookings(
    dummyBookings.filter((booking) => booking.date > new Date() && !booking.completed)
  );
  const completedBookings = sortBookings(
    dummyBookings.filter((booking) => booking.completed)
  );

  return (
    <View style={styles.container}>
      {renderBookingList(
        todayBookings,
        "Today's Bookings",
        calculateProgress(todayBookings),
        { color: "#0192b1" }
      )}
      {renderBookingList(
        activeBookings,
        "Active Bookings",
        calculateProgress(activeBookings),
        { color: "#000000" }
      )}
      {renderBookingList(
        completedBookings,
        "Completed Bookings",
        calculateProgress(completedBookings),
        { color: "#4caf50" }
      )}
      {renderBookingList(
        yesterdayBookings,
        "Yesterday's Bookings",
        calculateProgress(yesterdayBookings),
        { color: "#7f8c8d" }
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  progressBar: {
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  bookingItem: {
    backgroundColor: "#0192b1",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  bookingText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#ffffff",
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    margin: 10,
    borderColor: "#0192b1",
    borderWidth: 2,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#000000",
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "#0192b1",
    borderRadius: 30,
    padding: 8,
    width: 40,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
