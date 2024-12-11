import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Camera } from 'expo-camera';

export default function Cameras() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const cameraRef = useRef(null);

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <ActivityIndicator size="small" color="red" />;
  }

  if (hasPermission === false) {
    Alert.alert('Permission Denied', 'Cannot access camera');
    return <View />;
  }

  const handleBarCodeScanned = async ({ data }) => {
    if (!isScanned) {
      setIsScanned(true);
      Alert.alert('Scanned Data', data);
      console.log('Scanned Data:', data);

      // Optional: Reset the scanning flag after 2 seconds to allow for rescan
      setTimeout(() => {
        setIsScanned(false);
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.scanner}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={isScanned ? undefined : handleBarCodeScanned}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scanner: {
    flex: 1,
  },
});
