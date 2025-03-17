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
import { useRouter,useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors } from "../constants/Colors" ;

export default function AddProduct() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  console.log("Pantry",params.barcode);

  const handleAddProduct = async () => {
    if (!productName && !quantity) {
      setError('Name and quantity cannot be empty.');
      return; 
    }
    if (!productName) {
      setError('Name cannot be empty.');
      return; 
    }
    if (!quantity) {
      setError('Quantity cannot be empty.');
      return; 
    }

    // Check for commas in inputs
    const commaRegex = /,/; // Regular expression to check for commas
    if (commaRegex.test(productName)) {
      setError('Product name cannot contain a comma.');
      return;
    }
    if (commaRegex.test(quantity)) {
      setError('Quantity cannot contain a comma.');
      return;
    }
    setError(''); // Clear error if inputs are valid

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
          onPress: ()=> sendToServer(productName, quantity)
        }
      ]
    );

  };
    const sendToServer = (productName,quantity) => {
      console.log("Adding %d %s to the pantry",quantity,productName ); 
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
          
          {error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={20} color="red" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleAddProduct}>
            <Ionicons name="add-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Add Product to the Pantry</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.successButton]}
            onPress={() => router.push(`/scanner?from=${encodeURIComponent("add_product_pantry")}`)}
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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
