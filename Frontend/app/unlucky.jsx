import React from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  Pressable, 
  SafeAreaView, 
  useColorScheme 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";

const Colors = {
  light: {
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#000000',
    secondaryText: '#8E8E93',
    border: '#E5E5EA',
    primary: '#FF3B30',
  },
  dark: {
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    secondaryText: '#8E8E93',
    border: '#38383A',
    primary: '#FF453A',
  },
};


export default function Unlucky() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View 
        style={styles.content} 
        entering={FadeIn.duration(800)}
      >
        <View style={[styles.iconContainer, { backgroundColor: theme.card }]}>
          <Ionicons name="sad-outline" size={64} color={theme.primary} />
        </View>
        <Text style={[styles.title, { color: theme.text }]}>Unlucky</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          You shouldn't forget your password!
        </Text>

        <Pressable 
          style={[styles.button, { backgroundColor: theme.primary }]} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.buttonText}>Login Screen</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  content: {
    alignItems: "center",
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    width: 160,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

