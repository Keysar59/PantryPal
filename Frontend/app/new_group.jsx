import { Text, View, StyleSheet, Pressable, TextInput, SafeAreaView, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function NewGroup() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = () => {
    // ... existing code ...
    
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#007AFF" />
          </Pressable>
          <Text style={[styles.title, { color: theme.text, fontSize: 34 }]}>New Group</Text>
        </View>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            placeholder="Enter group name"
            placeholderTextColor={theme.secondaryText}
            value={groupName}
            onChangeText={setGroupName}
          />
        </View>
        <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleCreateGroup}>
          <Ionicons name="add-circle-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Create Group</Text>
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
  card: {
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});