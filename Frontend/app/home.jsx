import { Text, View, StyleSheet, Pressable, SafeAreaView, useColorScheme } from "react-native";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import axios from 'axios';
// Define theme colors
import { Colors } from "../constants/Colors" ;
const communication = require('../src/services/communication');

export default function Home() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  
  useEffect(() => {
    const getGroups = async () => {
      try {
        const response = await communication.getGroups();
        // console.log("-------------",response.data.groups[0][1]);
        //console.log("Response to group fetching:", response.data.message);
        if (response.data.groups)
          setGroups(response.data.groups);
        else
        {
          setGroups([]);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
      
    };
    // console.log(response.data.groups);
    getGroups();

    //THIS SHOULD BE REMOVED THE SECOND THAT THE SERVER ACTUALLY RESPONDS
    
  }, []);
  
  const handleGroupPress = (groupId, groupName) => {
    router.push(`/group?group_id=${encodeURIComponent(groupId)}&group_name=${encodeURIComponent(groupName)}`);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => router.push("/login")
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Groups</Text>
        <Pressable style={[styles.logoutButton, { backgroundColor: theme.card }]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="red" />
        </Pressable>
      </View>
      
      <View style={styles.groupsContainer}>
        {groups.map((group) => (
          <Pressable 
            key={group.id} 
            style={[styles.groupCard, { backgroundColor: theme.card }]}
            onPress={() => handleGroupPress(group[0], group[1])}
          >
            <View style={[styles.groupIcon, { backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#E8F2FF' }]}>
              <Ionicons name="people" size={24} color="#007AFF" />
            </View>
            <View style={styles.groupInfo}>
              <Text style={[styles.groupName, { color: theme.text }]}>{group[1]}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.secondaryText} />
          </Pressable>
        ))}
      </View>
      
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => router.push('/new_group')}>
          <Ionicons name="add-circle-outline" size={20} color="white" />
          <Text style={styles.buttonText}>New Group</Text>
        </Pressable>
        <Pressable 
          style={[styles.button, styles.secondaryButton, { 
            backgroundColor: theme.card,
            borderColor: '#007AFF'
          }]} 
          onPress={() => router.push('/join_group')}
        >
          <Ionicons name="enter-outline" size={20} color="#007AFF" />
          <Text style={styles.secondaryButtonText}>Join Group</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
  },
  groupsContainer: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  buttonContainer: {
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
});