import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  Alert
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

import { Colors } from "../constants/Colors" ;

export default function AddProduct() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddProduct = async () => {
    if (!productName && !quantity) {
      setError('Name and quantity cannot be empty.');
      return; 
    }
    if(!productName){
      setError('Name cannot be empty.');
      return; 
    }
    if(!quantity){
      setError('Quantity cannot be empty.');
      return; 
    }

    // Check for commas in inputs
    const commaRegex = /,/; // Regular expression to check for commas
    if (commaRegex.test(email)) {
      setError('Email cannot contain a comma.');
      return;
    }
    if (commaRegex.test(password)) {
      setError('Password cannot contain a comma.');
      return;
    }
    setError(''); // Clear error if inputs are valid
    router.push('/home'); // Navigate to home if inputs are valid

    Alert.alert(
      "Adding Product",
      `Product: ${productName}, Quantity: ${quantity}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Add Product",
          onPress: () => router.push('/add_product_shopping')
        }
      ]
    );
    // Here you would send the product info to your server.
    // Example using fetch:
    /*
    try {
      const response = await fetch('https://your-server.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: productName, quantity: quantity })
      });
      const data = await response.json();
      if (response.ok) {
        router.push('/products'); // Navigate to the products list page
      } else {
        console.error('Error adding product:', data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
    */
    // router.push('/add_pr');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#007AFF" />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>Add Product</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <TextInput
            style={[styles.input, { borderColor: theme.border, color: theme.text }]}
            placeholder="Product Name"
            placeholderTextColor={theme.secondaryText}
            value={productName}
            onChangeText={setProductName}
          />
          <TextInput
            style={[styles.input, { borderColor: theme.border, color: theme.text }]}
            placeholder="Quantity"
            placeholderTextColor={theme.secondaryText}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />
          <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleAddProduct}>
            <Ionicons name="add-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Add Product to the Shopping List</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.successButton]}
            onPress={() => router.push("/scanner")}
          >
            <Ionicons name="barcode" size={20} color="white" />
            <Text style={styles.buttonText}>Scan Barcode</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  successButton: {
    backgroundColor: '#34C759', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
});
