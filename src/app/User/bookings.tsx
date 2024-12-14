import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function BookingScreen() {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <Text style={styles.carModel}>SL 250 ML</Text>
                <Text style={styles.carDescription}>Muhammad Car</Text>
                <Text style={styles.priceText}>Price: RS:100</Text>
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
                <View style={styles.carImageContainer}>
                    <Image
                        source={require('../../Images/car1.png')} 
                        style={styles.carImage}
                    />
                    <View style={styles.greenOverlay}>
                        <TouchableOpacity style={styles.doneButton}>
                            <Text style={styles.doneText}>Done</Text>
                            <FontAwesome name="arrow-right" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Timer Section */}
            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>30 : 20 min</Text>
                <Text style={styles.dateText}>12:10 PM - 01 Dec 2021</Text>
            </View>

            {/* Zone Section */}
            <View style={styles.zoneContainer}>
                <Text style={styles.zoneTitle}>Zone</Text>
                <View style={styles.zoneDetails}>
                    <Text style={styles.zoneCode}>A-013</Text>
                    <FontAwesome name="map-marker" size={24} color="black" />
                </View>
            </View>

            {/* Stop Button */}
            <TouchableOpacity style={styles.stopButton}>
                <Text style={styles.stopButtonText}>Stop</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222222',
        alignItems: 'center',
        paddingTop: 50,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    carModel: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    carDescription: {
        fontSize: 16,
        color: 'gray',
        marginVertical: 5,
    },
    priceText: {
        fontSize: 18,
        color: 'white',
    },
    progressContainer: {
        marginVertical: 20,
    },
    carImageContainer: {
        position: 'relative',
    },
    carImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    greenOverlay: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'green',
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    doneButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
    },
    doneText: {
        color: 'white',
        marginRight: 5,
    },
    timerContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    timerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    dateText: {
        fontSize: 14,
        color: 'gray',
    },
    zoneContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        width: '90%',
        alignItems: 'center',
        marginVertical: 20,
    },
    zoneTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    zoneDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    zoneCode: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    stopButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    stopButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
});
