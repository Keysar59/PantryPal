import { Text, View, StyleSheet, Pressable, SafeAreaView, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
// Define theme colors
import { Colors } from "../constants/Colors" ;

export default function Home() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  
  // This would later be replaced with real data
  const mockGroups = [
    { id: 1, name: "Home", itemCount: 12 },
    { id: 2, name: "Picnic", itemCount: 5 },
  ];
  const handleGroupPress = (groupId, groupName) => {
    router.push({
      pathname: "/group",
      params: { id: groupId, name: groupName }
    });
  };
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>My Groups</Text>
      
      <View style={styles.groupsContainer}>
        {mockGroups.map((group) => (
          <Pressable 
            key={group.id} 
            style={[styles.groupCard, { backgroundColor: theme.card }]}
            onPress={() => handleGroupPress(group.id, group.name)}
          >
            <View style={[styles.groupIcon, { backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#E8F2FF' }]}>
              <Ionicons name="people" size={24} color="#007AFF" />
            </View>
            <View style={styles.groupInfo}>
              <Text style={[styles.groupName, { color: theme.text }]}>{group.name}</Text>
              <Text style={styles.groupItemCount}>{group.itemCount} items</Text>
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
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 8,
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
  groupItemCount: {
    fontSize: 14,
    color: '#8E8E93',
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