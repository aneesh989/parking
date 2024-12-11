import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import url from '../commons/axiosUrl.js';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
console.disableYellowBox = true;

const VisionCamera = ({ route, navigation }) => {
  const { bookingId } = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    // Request Camera Permission
    const requestPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    requestPermission();
  }, []);

  const handleBarCodeScanned = async (e) => {
    if (isScanning) return; // Prevent duplicate actions
    setIsScanning(true);

    console.log('Scanned data:', e.data);
    try {
      await axios.post(url + 'bookingVehicles', {
        parkingBookingRecords: { id: JSON.stringify(bookingId) },
        checkIn: Date.now(),
        checkInInput: e.data,
      });

      Alert.alert('QR Scanned!', 'WAITING FOR VEHICLE TO BE PARKED');
    } catch (error) {
      console.log('Error while processing scan', error);
      Alert.alert('Error', 'Could not process the scan');
    } finally {
      setIsScanning(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={handleBarCodeScanned}
      >
        <View style={styles.overlayContainer}>
          <View style={styles.topOverlay}>
            <Text style={styles.overlayText}>QR CODE SCANNER</Text>
          </View>
          <View style={styles.scanFrame} />
          <Animatable.View
            style={styles.scanBar}
            direction="alternate-reverse"
            iterationCount="infinite"
            duration={1700}
            easing="linear"
            animation={{
              translateY: -20,
            }}
          />
        </View>
      </Camera>
    </View>
  );
};

const overlayColor = 'rgba(0,0,0,0.5)';
const rectDimensions = SCREEN_WIDTH * 0.65;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topOverlay: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: overlayColor,
  },
  overlayText: {
    color: '#fff',
    fontSize: 20,
  },
  scanFrame: {
    width: rectDimensions,
    height: rectDimensions,
    borderWidth: 2,
    borderColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanBar: {
    width: SCREEN_WIDTH * 0.5,
    height: 3,
    backgroundColor: 'green',
    marginTop: 20,
  },
});

export default VisionCamera;
