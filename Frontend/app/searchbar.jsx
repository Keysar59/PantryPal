import { TextInput, View, StyleSheet, FlatList, Text, Image, TouchableOpacity, Pressable, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useColorScheme } from 'react-native';
import { Colors } from "../constants/Colors";
import { useRouter,useLocalSearchParams } from 'expo-router';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  const handleSearch = (text) => {
    setQuery(text);
    const exampleSuggestions = [
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
    { product_name: "Kiwi2", product_id: "789012", quantity: 7, product_image_url: "https://images3.memedroid.com/images/UPLOADED350/5d2697f698b57.jpeg" },
    { product_name: "Lemon2", product_id: "890123", quantity: 9, product_image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVPo64847GgwPlBLqx3z6xOGHgwx8aq1cK5g&s" },
    { product_name: "Mango2", product_id: "901234", quantity: 11, product_image_url: "https://media.craiyon.com/2023-09-09/9b441cc182bd45fda8dba904d7bcc4e5.webp" },
    { product_name: "Orange2", product_id: "012345", quantity: 14, product_image_url: "https://i.ytimg.com/vi/ZN5PoW7_kdA/hqdefault.jpg" },
  
    ];
    if (text.length > 0) {
      const searchRegex = new RegExp(text, 'i'); // 'i' flag makes it case-insensitive
      setSuggestions(exampleSuggestions.filter(item => searchRegex.test(item.product_name)));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
  };

  const handleAddProduct = async () => {
    if (!query) {
      setError('Name and quantity cannot be empty.');
      console.log("error");
      return;
    }
    chooseProduct()
  };
    const chooseProduct = () => {
      
      console.log("Adding...", query ); 
      router.push(`/${"chooseProduct"}?product=${encodeURIComponent(query)}`);
    };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => {/* Add back navigation logic */}}>
          <Ionicons name="chevron-back" size={28} color="#007AFF" />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>Search</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <View style={{ position: "relative" }}> 
        <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
          <Ionicons name="search" size={20} color={theme.text} />
          <TextInput
            style={[styles.searchInput, { color: theme.text, borderColor: theme.border }]}
            placeholder="Search..."
            placeholderTextColor={theme.secondaryText}
            value={query}
            onChangeText={handleSearch}
            onSubmitEditing={() => handleAddProduct(query)} 
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={handleClear}>
              <Ionicons name="close-circle" size={20} color={theme.text} />
            </TouchableOpacity>
          )}
        </View>

        {suggestions.length > 0 && (
          <View style={[styles.suggestionsContainer, { backgroundColor: theme.card }]}>
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.product_name}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.suggestionItem} onPress={() => router.push(`/addProduct?product_name=${encodeURIComponent(item.product_name)}&product_id=${encodeURIComponent(item.product_id)}&product_image_url=${encodeURIComponent(item.product_image_url)}`)}>
                  <View style={styles.suggestionContent}>
                    {item.product_image_url ? (
                      <Image source={{ uri: item.product_image_url }} style={styles.suggestionImage} />
                    ) : null}
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.suggestionText, { color: theme.text }]}>{item.product_name}</Text>
                      <Text style={[styles.barcodeText, { color: theme.secondaryText }]}>Barcode: {item.product_id}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              scrollEnabled={suggestions.length > 3}
            />
          </View>
        )}
      </View>
      <View style={[styles.card, { backgroundColor: theme.card, marginTop: suggestions.length > 0 ? 270 : 0 }]}>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    paddingVertical: 2,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    borderRadius: 15,
    zIndex: 1,
    paddingVertical: 8,
    maxHeight: 270,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 10,
  },
  suggestionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  suggestionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  barcodeText: {
    fontSize: 14,
  },
  suggestionImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
  }
});
