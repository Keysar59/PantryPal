import { Text, View, StyleSheet, Pressable, TextInput, SafeAreaView, useColorScheme, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Define theme colors
const Colors = {
  light: {
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#000000',
    secondaryText: '#8E8E93',
  },
  dark: {
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    secondaryText: '#8E8E93',
  },
};

export default function NewGroup() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert("Error", "Group name cannot be empty.");
      return;
    }

    try {
      // Replace with your server endpoint
      const response = await fetch('https://your-server.com/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: groupName }),
      });

      if (response.ok) {
        Alert.alert("Success", "Group created successfully!");
        router.push('/home'); // Navigate to home or another page
      } else {
        Alert.alert("Error", "Failed to create group.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while creating the group.");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Create New Group</Text>
      <TextInput
        style={[styles.input, { color: theme.text, backgroundColor: theme.card }]}
        placeholder="Enter group name"
        placeholderTextColor={theme.secondaryText}
        value={groupName}
        onChangeText={setGroupName}
      />
      <Pressable style={styles.button} onPress={handleCreateGroup}>
        <Ionicons name="checkmark" size={20} color="white" />
        <Text style={styles.buttonText}>Create Group</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 