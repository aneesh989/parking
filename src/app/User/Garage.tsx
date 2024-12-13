import { navigate} from "expo-router";
import React, { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  SafeAreaView,
  Image,
} from "react-native";

const GarageApp = ({ navigation }: { navigation: any }) => {
  const [selectedGarage, setSelectedGarage] = useState("Garage A");
  const [slots, setSlots] = useState(generateSlots(30)); // Dynamically generate slots
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const route = useRoute(); // Access route params
  const { name, location, price, availability } = route.params;

  // Function to simulate navigation
 

  function generateSlots(totalSlots) {
    let garages = [];
    for (let i = 0; i < totalSlots; i++) {
      garages.push({
        id: i + 1,
        garage: `Garage ${String.fromCharCode(65 + Math.floor(i / 12))}`,
        name: `${600 + i + 1}`,
        available: Math.random() > 0.3, // Random availability
      });
    }
    return garages;
  }

  const onSlotPress = (slot) => {
    setSelectedSlot(slot);
    setCheckoutVisible(true);
  };

  const renderSlot = ({ item }) => {
    const isSelected = selectedSlot && selectedSlot.id === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.slot,
          item.available ? styles.availableSlot : styles.unavailableSlot,
          isSelected && styles.selectedSlot,
        ]}
        disabled={!item.available}
        onPress={() => onSlotPress(item)}
      >
        {!item.available && (
          <Image
          source={require('../../Images/car.png')}
            style={styles.carIcon}
          />
        )}
        <Text style={styles.slotText}>{item.name}</Text>
        {item.available && <Text style={styles.statusText}>Available</Text>}
      </TouchableOpacity>
    );
  };

  const renderGarageOptions = () => {
    const garageNames = [...new Set(slots.map((slot) => slot.garage))];
    return garageNames.map((garage) => (
      <TouchableOpacity
        key={garage}
        style={[
          styles.garageOption,
          selectedGarage === garage && styles.selectedGarage,
        ]}
        onPress={() => setSelectedGarage(garage)}
      >
        <Text style={styles.garageText}>{garage}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ParkPro</Text>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <AntDesign  name="close" size={24} color="black" />
          {/* <Text style={styles.closeButton}>X</Text> */}
        </TouchableOpacity>
      </View>

      {/* Location */}
      <Text style={styles.location}>{name}</Text>

      {/* Slots */}
      <FlatList
        data={slots.filter((slot) => slot.garage === selectedGarage)}
        renderItem={renderSlot}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.slotList}
      />

      {/* Garage Options */}
      <View style={styles.garageContainer}>{renderGarageOptions()}</View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("HomeScreen")}
        disabled={!selectedSlot}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* Checkout Modal */}
      {checkoutVisible && (
        <Modal
          transparent={true}
          visible={checkoutVisible}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Booking</Text>
              <Text style={styles.modalText}>
                Parking Place: {selectedSlot?.name}
              </Text>
              <Text style={styles.modalText}>Garage: {selectedGarage}</Text>
              <Text style={styles.modalText}>{price}</Text>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => setCheckoutVisible(false)}
              >
                <Text style={styles.bookText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 18,
    color: "#888",
  },
  location: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
  slotList: {
    paddingHorizontal: 16,
  },
  slot: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    position: "relative",
  },
  availableSlot: {
    borderColor: "#00C851",
  },
  unavailableSlot: {
    borderColor: "#D9534F",
    backgroundColor: "#F9F9F9",
  },
  selectedSlot: {
    backgroundColor: "#007BFF",
  },
  slotText: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 12,
    color: "#888",
  },
  carIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 8,
  },
  garageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  garageOption: {
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#888",
  },
  selectedGarage: {
    backgroundColor: "#007BFF",
  },
  garageText: {
    color: "#000",
  },
  continueButton: {
    margin: 36,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#007BFF",
    alignItems: "center",
  },
  continueText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 4,
  },
  bookButton: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#007BFF",
    alignItems: "center",
  },
  bookText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default GarageApp;
