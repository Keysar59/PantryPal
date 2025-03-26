import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet, FlatList, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

async function getProducts(page = 1) {
  // For demonstration, return example suggestions.
  const exampleSuggestions = [
    { name: "Apple", barcode: "123456", image_url: "https://www.officedepot.co.il/media/amasty/shopby/option_images/app-removebg-preview.png" },
    { name: "ABanana", barcode: "234567", image_url: "https://static.wikia.nocookie.net/surrealmemes/images/b/b5/Ba.png/revision/latest?cb=20200325160337" },
    { name: "ACherry", barcode: "345678", image_url: "https://i.imgflip.com/1sz5j9.jpg?a483672" },
    { name: "ADate", barcode: "456789", image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_JSDLrbat3blYyZ22rfZoxVSM-r7rWL2EGw&s" },
    { name: "AFig", barcode: "567890", image_url: "https://i.ytimg.com/vi/F2coGXkY0Mk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD40OTzMswLb9q7Ru4Op9vKAT6lFQ" },
    { name: "AGrape", barcode: "678901", image_url: null },
  
    // Additional items that share first 3 letters with existing products
    { name: "Appetizer", barcode: "789012", image_url: "https://upload.wikimedia.org/wikipedia/commons/8/84/Appetizers.jpg" },
    { name: "Appleseed", barcode: "890123", image_url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Apple_Seeds.jpg" },
    
    { name: "ABar", barcode: "901234", image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Chocolate_bar.jpg" },
    { name: "ABasil", barcode: "012345", image_url: "https://upload.wikimedia.org/wikipedia/commons/6/64/Basil_herb.JPG" },
  
    { name: "AChoco", barcode: "112233", image_url: "https://upload.wikimedia.org/wikipedia/commons/7/70/Chocolate_%28blue_background%29.jpg" },
    { name: "AChili", barcode: "223344", image_url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Chili_pepper.jpg" },
  
    { name: "ADanish", barcode: "334455", image_url: "https://upload.wikimedia.org/wikipedia/commons/1/12/Danish_pastry.jpg" },
    { name: "ADrumstick", barcode: "445566", image_url: "https://upload.wikimedia.org/wikipedia/commons/7/71/Fried_chicken_drumstick.jpg" },
  
    { name: "AFish", barcode: "556677", image_url: "https://upload.wikimedia.org/wikipedia/commons/d/da/Salmon_Fish.jpg" },
    { name: "AFilet", barcode: "667788", image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Beef_fillet.jpg" },
  
    { name: "AGrapefruit", barcode: "778899", image_url: "https://upload.wikimedia.org/wikipedia/commons/4/42/Grapefruit%2C_whole_and_half.jpg" },
    { name: "AGranola", barcode: "889900", image_url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Granola_%28cropped%29.jpg" },
  ];
  
  return exampleSuggestions;
}

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (input.length > 2) {
        fetchProducts();
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [input]);

  const fetchProducts = async () => {
    setLoading(true);
    const products = await getProducts();
    const regex = new RegExp(input, "i");
    const filteredProducts = products.filter(product => regex.test(product.name));
    setSuggestions(filteredProducts);
    setLoading(false);
  };

  const handleSelectSuggestion = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
  };

  const handleClear = () => {
    setInput("");
    setSuggestions([]);
  };

  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#8E8E93" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#8E8E93"
        value={input}
        onChangeText={setInput}
      />
      {input.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Ionicons name="close-circle" size={20} color="#8E8E93" />
        </TouchableOpacity>
      )}
      
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        suggestions.length > 0 && (
          <View style={[styles.suggestionsContainer, { maxHeight: 270 }]}>
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelectSuggestion(item.name)}>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.suggestionText}>
                      {item.name}
                    </Text>
                    <Text style={styles.barcodeText}>
                      Barcode: {item.barcode}
                    </Text>
                    {item.image_url ? (
                      <Image source={{ uri: item.image_url }} style={styles.imageStyle} />
                    ) : (
                      <Ionicons name="image" color="black" size={30} />
                    )}
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              scrollEnabled={suggestions.length > 3}
            />
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // This container will stick to the top of the screen.
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginHorizontal: 16,
    marginTop: 40, // Increase this value if you need extra space (e.g., for a status bar)
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 100, // Ensure it appears above other content
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    padding: 0,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 60, // Adjust based on the height of your searchContainer
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    zIndex: 101,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  suggestionItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  suggestionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  barcodeText: {
    fontSize: 14,
    color: "#888",
  },
  imageStyle: {
    width: 60,
    height: 60,
    marginLeft: 8,
  },
});
