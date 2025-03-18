import { TextInput, View, StyleSheet, FlatList, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    // Example suggestions, replace with your data source
    const exampleSuggestions = ["Apple", "ABanana", "ACherry", "Date", "Fig", "Grape"];
    // Only set suggestions if text is not empty
    if (text.length > 2) {
      setSuggestions(exampleSuggestions.filter(item => item.toLowerCase().startsWith(text.toLowerCase())));
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion); // Set the input to the selected suggestion
    setSuggestions([]); // Clear suggestions after selection
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
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Text 
                style={styles.suggestion} 
                onPress={() => handleSelectSuggestion(item)} // Handle suggestion selection
              >
                {item}
              </Text>
            )}
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
  },
  suggestion: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 8, // Rounded corners for suggestions
  },
  suggestionHovered: {
    backgroundColor: '#f0f0f0', // Light background on hover
  },
});
