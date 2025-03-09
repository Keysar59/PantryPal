import { Text, View, StyleSheet, Pressable, ScrollView, TextInput, SafeAreaView, useColorScheme, Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
// Define theme colors (same as in index.jsx)
const Colors = {
  light: {
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#000000',
    secondaryText: '#8E8E93',
    border: '#E5E5EA',
    tabBackground: '#E5E5EA',
  },
  dark: {
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    secondaryText: '#8E8E93',
    border: '#38383A',
    tabBackground: '#1C1C1E',
  },
};
export default function Group() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { name } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("shopping"); // "shopping" or "pantry"
  const [shoppingSearch, setShoppingSearch] = useState("");
  const [pantrySearch, setPantrySearch] = useState("");
  const [shoppingList, setShoppingList] = useState([
    { id: 1, name: "eggs", quantity: 2 },
    { id: 2, name: "bread", quantity: 1 },
    { id: 3, name: "tomatos", quantity: 5 },
  ]);
  const [pantryList, setPantryList] = useState([
    { id: 1, name: "milk", quantity: 2 },
    { id: 2, name: "cheese", quantity: 1 },
  ]);
  // Filter function for both lists
  const getFilteredItems = (items, searchTerm) => {
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  // Get the filtered lists based on search terms
  const filteredShoppingList = getFilteredItems(shoppingList, shoppingSearch);
  const filteredPantryList = getFilteredItems(pantryList, pantrySearch);
  const handleIncrement = (itemId, isPantry) => {
    if (isPantry) {
      setPantryList(currentList =>
        currentList.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setShoppingList(currentList =>
        currentList.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };
  const handleDecrement = (itemId, isPantry) => {
    if (isPantry) {
      setPantryList(currentList =>
        currentList.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0)
      );
    } else {
      setShoppingList(currentList =>
        currentList.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0)
      );
    }
  };
  const handleDelete = (itemId, isPantry) => {
    if (isPantry) {
      setPantryList(currentList =>
        currentList.filter(item => item.id !== itemId)
      );
    } else {
      setShoppingList(currentList =>
        currentList.filter(item => item.id !== itemId)
      );
    }
  };
  const handleDeleteList = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete the list?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            // Add your delete list logic here
          }
        }
      ]
    );
  };
  const renderItem = (item, isPantry = false) => (
    <Pressable 
      key={item.id} 
      style={[styles.itemCard, { backgroundColor: theme.card }]}
      android_ripple={{ color: colorScheme === 'dark' ? '#2C2C2E' : '#f0f0f0' }}
    >
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.itemQuantity, { color: theme.secondaryText }]}>Quantity: {item.quantity}</Text>
      </View>
      <View style={styles.itemActions}>
        <Pressable 
          onPress={() => handleIncrement(item.id, isPantry)} 
          style={styles.actionButton}
        >
          <Ionicons name="add-circle" size={28} color="#34C759" />
        </Pressable>
        <Pressable 
          onPress={() => handleDecrement(item.id, isPantry)} 
          style={styles.actionButton}
        >
          <Ionicons name="remove-circle" size={28} color="#FF9500" />
        </Pressable>
        <Pressable 
          onPress={() => handleDelete(item.id, isPantry)} 
          style={styles.actionButton}
        >
          <Ionicons name="trash" size={24} color="#FF3B30" />
        </Pressable>
      </View>
    </Pressable>
  );
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons 
            name="chevron-back" 
            size={28} 
            color="#007AFF"
          />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>{name}</Text>
      </View>
      
      <View style={[styles.tabContainer, { backgroundColor: theme.tabBackground }]}>
        <Pressable 
          style={[
            styles.tab, 
            activeTab === "shopping" && [styles.activeTab, { backgroundColor: theme.card }]
          ]}
          onPress={() => setActiveTab("shopping")}
        >
          <Ionicons 
            name="cart" 
            size={20} 
            color={activeTab === "shopping" ? "#007AFF" : theme.secondaryText} 
          />
          <Text style={[
            styles.tabText,
            { color: activeTab === "shopping" ? "#007AFF" : theme.secondaryText }
          ]}>
            Shopping List
          </Text>
          {activeTab === "shopping" && <View style={styles.underline} />}
        </Pressable>
        <Pressable 
          style={[
            styles.tab, 
            activeTab === "pantry" && [styles.activeTab, { backgroundColor: theme.card }]
          ]}
          onPress={() => setActiveTab("pantry")}
        >
          <Ionicons 
            name="home" 
            size={20} 
            color={activeTab === "pantry" ? "#007AFF" : theme.secondaryText} 
          />
          <Text style={[
            styles.tabText,
            { color: activeTab === "pantry" ? "#007AFF" : theme.secondaryText }
          ]}>
            In Pantry
          </Text>
          {activeTab === "pantry" && <View style={styles.underline} />}
        </Pressable>
      </View>
      <View style={[styles.searchContainer, { backgroundColor: theme.tabBackground }]}>
        <Ionicons name="search" size={20} color={theme.secondaryText} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder={`Search ${activeTab === "shopping" ? "shopping list" : "pantry"}...`}
          placeholderTextColor={theme.secondaryText}
          value={activeTab === "shopping" ? shoppingSearch : pantrySearch}
          onChangeText={activeTab === "shopping" ? setShoppingSearch : setPantrySearch}
        />
      </View>
      <View style={styles.sectionHeader}>
        <Ionicons 
          name={activeTab === "shopping" ? "cart" : "home"} 
          size={24} 
          color="#007AFF" 
        />
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {activeTab === "shopping" ? "Shopping List" : "In Pantry"}
        </Text>
      </View>
      <ScrollView style={styles.content}>
        {activeTab === "shopping" ? (
          <>
            {filteredShoppingList.length > 0 ? (
              filteredShoppingList.map(item => renderItem(item))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="search" size={48} color="#C7C7CC" />
                <Text style={styles.emptyStateText}>
                  {shoppingSearch 
                    ? "No matching items found" 
                    : "Your shopping list is empty"}
                </Text>
              </View>
            )}
            <View style={styles.buttonContainer}>
            <Pressable
               style={styles.button} 
               onPress={() => router.push('/add_product')}
               >
                <Ionicons name="add" size={20} color="white" />
                <Text style={styles.buttonText}>Add Product</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.warningButton]} onPress={handleDeleteList}>
                <Ionicons name="trash" size={20} color="white" />
                <Text style={styles.buttonText}>Delete List</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            {filteredPantryList.length > 0 ? (
              filteredPantryList.map(item => renderItem(item, true))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="search" size={48} color="#C7C7CC" />
                <Text style={styles.emptyStateText}>
                  {pantrySearch 
                    ? "No matching items found" 
                    : "Your pantry is empty"}
                </Text>
              </View>
            )}
            <View style={styles.buttonContainer}>
              <Pressable
               style={styles.button} 
               onPress={() => router.push('/add_product')}
               >
                <Ionicons name="add" size={20} color="white" />
                <Text style={styles.buttonText}>Add Product</Text>
              </Pressable>
              <Pressable 
                style={[styles.button, styles.successButton]} 
                onPress={() => router.push("/scan")}
              >
                <Ionicons name="barcode" size={20} color="white" />
                <Text style={styles.buttonText}>Scan Barcode</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.bottomButtons}>
        <Pressable style={[styles.button, styles.dangerButton]} onPress={() => {}}>
          <Ionicons name="trash" size={20} color="white" />
          <Text style={styles.buttonText}>Delete Group</Text>
        </Pressable>
        <Pressable 
          style={[styles.button, styles.secondaryButton, { backgroundColor: theme.card }]} 
          onPress={() => {}}
        >
          <Ionicons name="exit" size={20} color="#007AFF" />
          <Text style={styles.secondaryButtonText}>Leave Group</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#E5E5EA',  // This will be overridden by theme
    borderRadius: 12,  // Changed to match other elements
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'column',  // Changed to column to accommodate underline
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 8,
    borderRadius: 8,
    position: 'relative',  // For absolute positioning of underline
  },
  activeTab: {
    backgroundColor: 'white',  // This will be overridden by theme
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#8E8E93',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    paddingBottom: 32,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  warningButton: {
    backgroundColor: '#FF9500',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  successButton: {
    backgroundColor: '#34C759',  // iOS green color
  },
  clearButton: {
    padding: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 12,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 8,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 12,
    right: 12,
    height: 2,
    backgroundColor: '#007AFF',
    borderRadius: 1,
  },
}); 