import { View, Text, Image, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useColorScheme } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from "../constants/Colors";
const communication = require('../src/services/communication');

export default function AddProduct() {
  const router = useRouter();
  const params = useLocalSearchParams(); //group_id is under params.group_id
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  const [quantity, setQuantity] = useState(1);
  console.log(params.product_id);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAdd = async () => {
    // Add product logic here
    product = {"product_id" : params.product_id, "product_name" : params.product_name, "product_image_url" : params.product_image_url}
    //listId?
    await communication.addProductToList(listId, quantity, product)
    console.log("Adding %s",params.product_name);
    router.push("group");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#007AFF" />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>Add Product</Text>
      </View>

      <View style={[styles.productCard, { backgroundColor: theme.card }]}>
        <Image 
          source={{ uri: params.product_image_url }} 
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={[styles.productName, { color: theme.text }]}>{params.product_name}</Text>
          <Text style={[styles.barcodeText, { color: theme.secondaryText }]}>
            Barcode: {params.product_id}
          </Text>
        </View>
      </View>

      <View style={[styles.quantityCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.quantityLabel, { color: theme.text }]}>Quantity</Text>
        <View style={styles.quantityControls}>
          <Pressable onPress={handleDecrement} style={styles.actionButton}>
            <Ionicons name="remove-circle" size={28} color="#FF9500" />
          </Pressable>
          <Text style={[styles.quantityText, { color: theme.text }]}>{quantity}</Text>
          <Pressable onPress={handleIncrement} style={styles.actionButton}>
            <Ionicons name="add-circle" size={28} color="#34C759" />
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, styles.secondaryButton, { backgroundColor: theme.card }]} 
          onPress={() => router.back()}
        >
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </Pressable>
        <Pressable 
          style={[styles.button, styles.successButton]} 
          onPress={handleAdd}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.buttonText}>Add to List</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 4,
    flex: 1,
  },
  productCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  barcodeText: {
    fontSize: 16,
  },
  quantityCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quantityLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  quantityText: {
    fontSize: 24,
    fontWeight: 'bold',
    minWidth: 40,
    textAlign: 'center',
  },
  actionButton: {
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
    paddingBottom: 32,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: '#FF3B30',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  successButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
});
