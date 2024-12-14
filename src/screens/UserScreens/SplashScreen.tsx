import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate('OnBoarding')}>
      <View style={styles.shadowLarge} />
      <View style={styles.shadowMedium} />
      <View style={styles.shadowSmall} />
      <View style={styles.innerCircle}>
        <Image source={require('../../Images/Logo.png')} style={styles.icon} />
      </View>
    </Pressable>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Pure black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowLarge: {
    position: 'absolute',
    width: 250,
    height: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Lightest opacity
    borderRadius: 125,
  },
  shadowMedium: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Semi-transparent white
    borderRadius: 100,
  },
  shadowSmall: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly stronger opacity
    borderRadius: 75,
  },
  innerCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff', // Pure white circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 120,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
    marginLeft: 4,
  },
});
