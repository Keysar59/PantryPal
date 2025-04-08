import { View, Text, Image, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
    const shoppingListId = (await communication.getListsIds(params.group_id)).shopping_list_id;
    await communication.addProductToList(shoppingListId, quantity, product)
    console.log("Adding %s",params.product_name);
    router.push("group");
  };

  const handleAddToPantry = async () => {
    // Add pantry logic here
    product = {"product_id" : params.product_id, "product_name" : params.product_name, "product_image_url" : params.product_image_url}
    const pantryListId = (await communication.getListsIds(params.group_id)).pantry_list_id;
    await communication.addProductToList(pantryListId, quantity, product)
    console.log("Adding %s to pantry", params.product_name);
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
        <View style={styles.imageContainer}>
          {params.product_image_url ? (
            <Image 
              source={{ uri: params.product_image_url }} 
              style={styles.productImage}
            />
          ) : (
            <View style={[styles.defaultImageContainer, { backgroundColor: theme.border }]}>
              <MaterialCommunityIcons name="cart-outline" size={80} color={theme.secondaryText} />
            </View>
          )}
        </View>
        <View style={styles.productInfo}>
          <Text style={[styles.productName, { color: theme.text }]}>{params.product_name}</Text>
          <View style={styles.barcodeContainer}>
            <MaterialCommunityIcons name="barcode" size={20} color={theme.secondaryText} />
            <Text style={[styles.barcodeText, { color: theme.secondaryText }]}>
              {params.product_id}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.quantityCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.quantityLabel, { color: theme.text }]}>Select Quantity</Text>
        <View style={styles.quantityControls}>
          <Pressable 
            onPress={handleDecrement} 
            style={[styles.quantityButton, { backgroundColor: theme.border }]}
          >
            <Ionicons name="remove" size={24} color={theme.text} />
          </Pressable>
          <Text style={[styles.quantityText, { color: theme.text }]}>{quantity}</Text>
          <Pressable 
            onPress={handleIncrement}
            style={[styles.quantityButton, { backgroundColor: theme.border }]}
          >
            <Ionicons name="add" size={24} color={theme.text} />
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, styles.cancelButton]} 
          onPress={() => router.push(`/searchbar?group_id=${encodeURIComponent(params.group_id)}`)}
        >
          <Ionicons name="close-circle" size={20} color="white" />
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable 
          style={[styles.button, styles.pantryButton]} 
          onPress={handleAddToPantry}
        >
          <Ionicons name="home" size={20} color="white" />
          <Text style={styles.buttonText}>Add to Pantry</Text>
        </Pressable>
        <Pressable 
          style={[styles.button, styles.successButton]} 
          onPress={handleAdd}
        >
          <Ionicons name="checkmark-circle" size={20} color="white" />
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
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  defaultImageContainer: {
    width: 220,
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 220,
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
  },
  productInfo: {
    alignItems: 'center',
    width: '100%',
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  barcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  barcodeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  quantityCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  quantityLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 28,
    fontWeight: 'bold',
    minWidth: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 'auto',
    paddingBottom: 32,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  pantryButton: {
    backgroundColor: '#007AFF',
  },
  successButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});
