import { TextInput, View, StyleSheet, FlatList, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    // Example suggestions, replace with your data source
    const exampleSuggestions = [
      { name: "Apple", barcode: "123456", quantity: 10, image_url: "https://www.officedepot.co.il/media/amasty/shopby/option_images/app-removebg-preview.png" },
      { name: "ABanana", barcode: "234567", quantity: 5, image_url: "https://static.wikia.nocookie.net/surrealmemes/images/b/b5/Ba.png/revision/latest?cb=20200325160337" },
      { name: "ACherry", barcode: "345678", quantity: 20, image_url: "https://i.imgflip.com/1sz5j9.jpg?a483672" },
      { name: "ADate", barcode: "456789", quantity: 15, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_JSDLrbat3blYyZ22rfZoxVSM-r7rWL2EGw&s" },
      { name: "AFig", barcode: "567890", quantity: 8, image_url: "https://i.ytimg.com/vi/F2coGXkY0Mk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD40OTzMswLb9q7Ru4Op9vKAT6lFQ" },
      { name: "AGrape", barcode: "678901", quantity: 12, image_url: "https://thefridaytimes.com/digital_images/large/2022-08-31/wow-grape-meme-to-be-auctioned-as-nft-1687413265-3746.png" },
    ];
    // Only set suggestions if text is not empty
    if (text.length > 0) {
      setSuggestions(exampleSuggestions.filter(item => item.name.toLowerCase().startsWith(text.toLowerCase())));
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleClear = () => {
    setQuery(""); // Clear the input
    setSuggestions([]); // Clear suggestions
  };

  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#8E8E93" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#8E8E93"
        value={query}
        onChangeText={handleSearch}
      />
      {query.length > 0 && ( // Show clear button only if there is text
        <TouchableOpacity onPress={handleClear}>
          <Ionicons name="close-circle" size={20} color="#8E8E93" />
        </TouchableOpacity>
      )}
      {suggestions.length > 0 && (
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
                    <Image source={{ uri: item.image_url }} style={styles.suggestionImage} />
                  ) : null}
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
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    padding: 0,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    zIndex: 1,
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
  suggestionImage: {
    width: 60,
    height: 60,
    marginLeft: 8,
  },
});
