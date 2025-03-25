import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity, Pressable, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useColorScheme } from 'react-native';
import { Colors } from "../constants/Colors";
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ChooseProduct() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  const [currentPage, setCurrentPage] = useState(0);

  const allProducts = [
    { product_name: "Apple", product_id: "123456", quantity: 10, product_image_url: "https://www.officedepot.co.il/media/amasty/shopby/option_images/app-removebg-preview.png" },
    { product_name: "Banana", product_id: "234567", quantity: 5, product_image_url: "https://static.wikia.nocookie.net/surrealmemes/images/b/b5/Ba.png/revision/latest?cb=20200325160337" },
    { product_name: "Cherry", product_id: "345678", quantity: 20, product_image_url: "https://i.imgflip.com/1sz5j9.jpg?a483672" },
    { product_name: "Date", product_id: "456789", quantity: 15, product_image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_JSDLrbat3blYyZ22rfZoxVSM-r7rWL2EGw&s" },
    { product_name: "Fig", product_id: "567890", quantity: 8, product_image_url: "https://i.ytimg.com/vi/F2coGXkY0Mk/hq720.jpg" },
    { product_name: "Grape", product_id: "678901", quantity: 12, product_image_url: "https://thefridaytimes.com/digital_images/large/2022-08-31/wow-grape-meme-to-be-auctioned-as-nft-1687413265-3746.png" },
    // Add more products to test pagination
    { product_name: "Kiwi", product_id: "789012", quantity: 7, product_image_url: "https://images3.memedroid.com/images/UPLOADED350/5d2697f698b57.jpeg" },
    { product_name: "Lemon", product_id: "890123", quantity: 9, product_image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVPo64847GgwPlBLqx3z6xOGHgwx8aq1cK5g&s" },
    { product_name: "Mango", product_id: "901234", quantity: 11, product_image_url: "https://media.craiyon.com/2023-09-09/9b441cc182bd45fda8dba904d7bcc4e5.webp" },
    { product_name: "Orange", product_id: "012345", quantity: 14, product_image_url: "https://i.ytimg.com/vi/ZN5PoW7_kdA/hqdefault.jpg" },
    { product_name: "Kiwi", product_id: "789012", quantity: 7, product_image_url: "https://images3.memedroid.com/images/UPLOADED350/5d2697f698b57.jpeg" },
    { product_name: "Lemon", product_id: "890123", quantity: 9, product_image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVPo64847GgwPlBLqx3z6xOGHgwx8aq1cK5g&s" },
    { product_name: "Mango", product_id: "901234", quantity: 11, product_image_url: "https://media.craiyon.com/2023-09-09/9b441cc182bd45fda8dba904d7bcc4e5.webp" },
    { product_name: "Orange", product_id: "012345", quantity: 14, product_image_url: "https://i.ytimg.com/vi/ZN5PoW7_kdA/hqdefault.jpg" },
  
  ];

  const productsPerPage = 10;
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const currentProducts = allProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSelectProduct = (product) => {
    console.log("Selected product:", product);
    router.push(`/addProduct?product_name=${encodeURIComponent(product.product_name)}&product_id=${encodeURIComponent(product.product_id)}&product_image_url=${encodeURIComponent(product.product_image_url)}`);
};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#007AFF" />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>Choose Product</Text>
      </View>
      <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
        Displaying options for {params.product}:
      </Text>

      <View style={[styles.productsContainer, { backgroundColor: theme.card }]}>
        <FlatList
          data={currentProducts}
          keyExtractor={(item) => item.product_id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.productItem} 
              onPress={() => handleSelectProduct(item)}
            >
              <View style={styles.productContent}>
                {item.product_image_url ? (
                  <Image source={{ uri: item.product_image_url }} style={styles.productImage} />
                ) : null}
                <View style={{ flex: 1 }}>
                  <Text style={[styles.productText, { color: theme.text }]}>{item.product_name}</Text>
                  <Text style={[styles.barcodeText, { color: theme.secondaryText }]}>
                    Barcode: {item.product_id}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.navigationButtons}>
        <Pressable 
          style={[
            styles.button, 
            { backgroundColor: currentPage > 0 ? theme.primary : theme.secondaryText }
          ]} 
          onPress={handlePrevious}
          disabled={currentPage === 0}
        >
          <Ionicons name="chevron-back" size={20} color="white" />
          <Text style={styles.buttonText}>Previous 10</Text>
        </Pressable>

        <Pressable 
          style={[
            styles.button, 
            { backgroundColor: currentPage < totalPages - 1 ? theme.primary : theme.secondaryText }
          ]} 
          onPress={handleNext}
          disabled={currentPage === totalPages - 1}
        >
          <Text style={styles.buttonText}>Next 10</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
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
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontStyle: 'italic',
  },
  productsContainer: {
    flex: 1,
    borderRadius: 15,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    maxHeight: 540,
    elevation: 5,
  },
  productItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 10,
  },
  productContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  productText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  barcodeText: {
    fontSize: 14,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
});
