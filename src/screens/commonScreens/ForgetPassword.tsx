import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import React from 'react';

const ForgetPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forget Password</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Enter your email" 
        keyboardType="email-address" 
      />
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.linkContainer}>
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: 10,
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
