import { Text, View, StyleSheet, Pressable, TextInput, SafeAreaView, useColorScheme, Alert } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import axios from 'axios';


export default function JoinGroup() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [groupId, setGroupId] = useState("");
  const [error, setError] = useState('');
  const [awaiting, setAwaiting] = useState(false);
  const url = "https://pantry-pal-keysar59-dev.apps.rm2.thpm.p1.openshiftapps.com/api/v1";


  const validateId = () => {
    if (groupId.length != 6){
      Alert.alert(
        "Invalid group Id"
      );
      console.log("Id: '" + groupId + "' is invalid");
      return false;
    }
    return true;
  };

  const handleJoinGroup = async () => {
    if (!validateId()){
      return;
    }
    if (awaiting){
      Alert.alert(
        "Please wait before pressing again",
        `Still awaiting response.`
      );
      console.log("still awaiting response");
      return;
    }

    setAwaiting(true);
    try {
      const response = await axios.post(url + '/group/join_group', { groupId }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
    } catch (error) {
      console.error('Error joining group:', error);
    } finally {
      setAwaiting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#007AFF" />
        </Pressable>
        <Text style={[styles.title, { color: theme.text, fontSize: 34 }]}>Join Group</Text>
      </View>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            placeholder="Enter group ID"
            placeholderTextColor={theme.secondaryText}
            value={groupId}
            onChangeText={setGroupId}
          />
        </View>
        {error ? (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error-outline" size={20} color="red" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
          ) : null}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={handleJoinGroup}
          />
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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
});