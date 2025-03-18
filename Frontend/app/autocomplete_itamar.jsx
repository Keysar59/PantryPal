import { useState, useEffect } from "react";
import { TextInput, View, StyleSheet, FlatList, Pressable, Text, Image, TouchableWithoutFeedback, SafeAreaView, Keyboard, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

async function getProducts(page = 1) {
  let endpoint = ""; // endpoint for getting product by name
  const res = await fetch(endpoint);
  if (res) {
    // const data = await res.json();
    const data = [
      { barcode: "0000000000", name: "test1", image_url: "https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/Test-Logo-Small-Black-transparent-1.png" },
      { barcode: "0000000000", name: "test1", image_url: "https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/Test-Logo-Small-Black-transparent-1.png" },
      { barcode: "0000000000", name: "test2", image_url: "https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/Test-Logo-Small-Black-transparent-1.png" },
      { barcode: "0000000000", name: "test3", image_url: "https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/Test-Logo-Small-Black-transparent-1.png" },
      { barcode: "0000000000", name: "test4", image_url: "https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/Test-Logo-Small-Black-transparent-1.png" },
      { barcode: "0000000000", name: "test5", image_url: null }
    ];
    return data;
  }
  return [];
}

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (input.length > 2) {
        fetchProducts();
      } else {
        setData([]);
      }
    }, 300); // Debounce time in milliseconds

    return () => clearTimeout(debounceTimeout);
  }, [input]);

  const fetchProducts = async () => {
    setLoading(true);
    const products = await getProducts();
    const regex = new RegExp(input, "i");
    const filteredProducts = products.filter(product => regex.test(product.name));
    setData(filteredProducts);
    setLoading(false);
  };

  const getItemText = (item) => {
    const name = item.name
    return (
      <View style={styles.itemTextContainer}>
        {item.image_url ? (
          <Image source={{ uri: item.image_url }} style={styles.imageStyle} />
        ) : (
          <Ionicons name="image" color="black" size={30} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.highlightedText}>
            {name}
          </Text>
        </View>
      </View>
    );
  };

  return (
      <SafeAreaView style={styles.container}>
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
            <Pressable onPress={() => setInput("")}>
              <Ionicons name="close-circle" size={20} color="#8E8E93" />
            </Pressable>
          )}
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          data.length > 0 && (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                  onPress={() => {
                    alert("Selected: " + JSON.stringify(item));
                    Keyboard.dismiss(); // Dismiss keyboard on selection
                  }}
                >
                  {getItemText(item)}
                </Pressable>
              )}
              keyExtractor={(item) => item.barcode}
              showsVerticalScrollIndicator={false}
            />
          )
        )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  itemTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  textContainer: { marginLeft: 10, flexShrink: 1 },
  mainText: { fontWeight: "700" },
  highlightedText: { fontWeight: "700", color: "#007AFF" }, // Highlighted text style
});