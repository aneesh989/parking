import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useSelector } from "react-redux";

const WalletPage = () => {
  const {wallet,name} = useSelector((state:any) => state.user);
    const cards = [
      {
        id: '1',
        type: 'Mastercard',
        number: '3056****5904',
        holder: name,
        expiry: '06/26',
        icon: require('../../Images//masterCard.png'), // Replace with the actual path to your Mastercard logo
      },
      {
        id: '2',
        type: 'Visa Electron',
        number: '5213****4854',
        holder: name,
        expiry: '06/26',
        icon: require('../../Images/visa.png'), // Replace with the actual path to your Visa logo
      },
    ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Select payment method</Text>
        {/* <TouchableOpacity style={styles.cardIconContainer}>
          <Text style={styles.cardIcon}>\uD83D\uDCB3</Text>
        </TouchableOpacity> */}
      </View>

      {/* Account Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Cards</Text>
        <View style={styles.accountContainer}>
          <View style={styles.accountDetails}>
          <Image
          source={require("../../Images/avtar.png")}
          style={styles.profileImage}
        />
            <View>
              <Text style={styles.accountBalance}>Balance Rs:{wallet}</Text>
              <Text style={styles.accountLabel}>Account</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Credit Cards Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Credit Cards</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Image source={item.icon} style={styles.cardIcon} />
            <View>
              <Text style={styles.cardNumber}>{item.number}</Text>
              <Text style={styles.cardDetails}>{`${item.holder} . ${item.expiry}`}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardIconContainer: {
    padding: 10,
  },
  cardIcon: {
    fontSize: 24,
    color: '#fff',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#111',
    borderRadius: 10,
  },
  accountDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  accountIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    marginRight: 10,
  },
  accountBalance: {
    color: '#0192b1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountLabel: {
    color: '#888',
    fontSize: 14,
  },
  topUpButton: {
    padding: 10,
    backgroundColor: '#0192b1',
    borderRadius: 10,
  },
  topUpText: {
    color: '#000',
    fontWeight: 'bold',
  },
  addButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#0192b1',
    borderRadius: 10,
  },
  addText: {
    color: '#000',
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#111',
    borderRadius: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDetails: {
    color: '#888',
    fontSize: 14,
  },
});

export default WalletPage;
