import { TextInput, View, StyleSheet, FlatList, Text, Image, TouchableOpacity, Pressable, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useColorScheme } from 'react-native';
import { Colors } from "../constants/Colors";
import { useRouter,useLocalSearchParams } from 'expo-router';
const communication = require('../src/services/communication');

export default function SearchBar() {
  const router = useRouter();
  const params = useLocalSearchParams(); // We are supposed to get a group_id
  const [error, setError] = useState('');

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      setIsLoading(true);
      try {
        const suggestions = await communication.getProductsOptionsByName(text);
        setSuggestions(suggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
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
      setError('Name and cannot be empty.');
      console.log("error");
      return;
    }
    chooseProduct()
  };
    const chooseProduct = () => {
      
      console.log("Adding...", query ); 
      router.push(`/${"chooseProduct"}?query=${encodeURIComponent(query)}&group_id=${encodeURIComponent(params.group_id)}`);
    };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => {router.back()}}>
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
          {query.length > 0 && !isLoading && (
            <TouchableOpacity onPress={handleClear}>
              <Ionicons name="close-circle" size={20} color={theme.text} />
            </TouchableOpacity>
          )}
          {isLoading && (
            <ActivityIndicator size="small" color={theme.primary} />
          )}
        </View>

        {suggestions.length > 0 && (
          <View style={[styles.suggestionsContainer, { backgroundColor: theme.card }]}>
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.product_name}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.suggestionItem} onPress={() => router.push(`/addProduct?product_name=${encodeURIComponent(item.product_name)}&product_id=${encodeURIComponent(item.product_id)}&product_image_url=${encodeURIComponent(item.product_image_url)}&group_id=${encodeURIComponent(params.group_id)}`)}>
                  <View style={styles.suggestionContent}>
                    {item.product_image_url ? (
                      <Image source={{ uri: item.product_image_url }} style={styles.suggestionImage} />
                    ) : (
                      <View style={[styles.defaultImageContainer, { backgroundColor: theme.border }]}>
                        <MaterialCommunityIcons name="cart-outline" size={40} color={theme.secondaryText} />
                      </View>
                    )}
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
      <View style={[styles.buttonContainer, { backgroundColor: theme.card, marginTop: suggestions.length > 0 ? 270 : 0 }]}>
        <Text style={[styles.buttonSectionTitle, { color: theme.text }]}>
          Add Product Options
        </Text>
        <View style={styles.buttonWrapper}>
          <Pressable 
            style={[styles.button, { backgroundColor: theme.primary }]} 
            onPress={handleAddProduct}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="add-outline" size={24} color="white" />
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>Add Product</Text>
                <Text style={styles.buttonSubtext}>Search product by name</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </View>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.scanButton]}
            onPress={() => router.push(`/scanner?group_id=${encodeURIComponent(params.group_id)}`)}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="barcode-outline" size={24} color="white" />
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>Scan Barcode</Text>
                <Text style={styles.buttonSubtext}>Quick add using barcode</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </View>
          </Pressable>
        </View>
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
  buttonContainer: {
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  buttonWrapper: {
    gap: 12,
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingVertical: 20,
  },
  buttonTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 2,
  },
  scanButton: {
    backgroundColor: '#34C759',
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
  },
  defaultImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
