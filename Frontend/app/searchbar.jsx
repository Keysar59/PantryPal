import { TextInput, View, StyleSheet, FlatList, Text, Image, TouchableOpacity, Pressable, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useColorScheme } from 'react-native';
import { Colors } from "../constants/Colors";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  const handleSearch = (text) => {
    setQuery(text);
    const exampleSuggestions = [
      { name: "Apple", barcode: "123456", quantity: 10, image_url: "https://www.officedepot.co.il/media/amasty/shopby/option_images/app-removebg-preview.png" },
      { name: "ABanana", barcode: "234567", quantity: 5, image_url: "https://static.wikia.nocookie.net/surrealmemes/images/b/b5/Ba.png/revision/latest?cb=20200325160337" },
      { name: "ACherry", barcode: "345678", quantity: 20, image_url: "https://i.imgflip.com/1sz5j9.jpg?a483672" },
      { name: "ADate", barcode: "456789", quantity: 15, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_JSDLrbat3blYyZ22rfZoxVSM-r7rWL2EGw&s" },
      { name: "AFig", barcode: "567890", quantity: 8, image_url: "https://i.ytimg.com/vi/F2coGXkY0Mk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD40OTzMswLb9q7Ru4Op9vKAT6lFQ" },
      { name: "AGrape", barcode: "678901", quantity: 12, image_url: "https://thefridaytimes.com/digital_images/large/2022-08-31/wow-grape-meme-to-be-auctioned-as-nft-1687413265-3746.png" },
    ];
    if (text.length > 0) {
      setSuggestions(exampleSuggestions.filter(item => item.name.toLowerCase().startsWith(text.toLowerCase())));
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
            onSubmitEditing={() => console.log(query)} 
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
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelectSuggestion(item.name)}>
                  <View style={styles.suggestionContent}>
                    {item.image_url ? (
                      <Image source={{ uri: item.image_url }} style={styles.suggestionImage} />
                    ) : null}
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.suggestionText, { color: theme.text }]}>{item.name}</Text>
                      <Text style={[styles.barcodeText, { color: theme.secondaryText }]}>Barcode: {item.barcode}</Text>
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
