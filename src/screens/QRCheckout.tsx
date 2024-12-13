import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import url from '../commons/axiosUrl';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const QRCheckout = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = async (event) => {
    if (scanned) return; // Prevent multiple scans
    setScanned(true);
    const scannedData = event?.data;

    try {
      await axios.post(url + 'bookingVehicles', {
        checkOut: Date.now(),
        checkOutInput: scannedData,
      });
      Alert.alert('Success', 'Check-out complete!');
    } catch (error) {
      console.error('Error during checkout:', error);
      Alert.alert('Error', 'Could not process checkout');
    } finally {
      setScanned(false); // Allow rescanning
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera. Please enable permissions.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Checkout</Text>
      <Camera
        style={styles.camera}
        ref={(ref) => setCameraRef(ref)}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        type={Camera.Constants.Type.back}
      />
      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)} style={styles.scanAgain}>
          <Text style={styles.scanAgainText}>Tap to scan again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  camera: {
    flex: 1,
    width: '100%',
    height: SCREEN_HEIGHT,
  },
  scanAgain: {
    position: 'absolute',
    bottom: 50,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  scanAgainText: {
    color: 'white',
    fontSize: 16,
  },
});

export default QRCheckout;
