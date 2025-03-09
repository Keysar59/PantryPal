import { 
    Text, 
    View, 
    StyleSheet, 
    Pressable, 
    SafeAreaView, 
    TextInput, 
    KeyboardAvoidingView, 
    Platform, 
    useColorScheme 
  } from 'react-native';
  import { Ionicons } from "@expo/vector-icons";
  import { useRouter } from "expo-router";
  
  import { Colors } from "../constants/Colors" ;

  
  export default function CreateAccount() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
  
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <KeyboardAvoidingView 
          style={styles.flex} 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Sign up to get started</Text>
            
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              placeholder="Full Name"
              placeholderTextColor={theme.secondaryText}
              autoCapitalize="words"
            />
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              placeholder="Email"
              placeholderTextColor={theme.secondaryText}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              placeholder="Password"
              placeholderTextColor={theme.secondaryText}
              secureTextEntry
            />
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              placeholder="Confirm Password"
              placeholderTextColor={theme.secondaryText}
              secureTextEntry
            />
            
            <Pressable 
              style={[styles.button, { backgroundColor: theme.primary }]} 
              onPress={() => {
                // Add your create account logic here
              }}
            >
              <Ionicons name="person-add-outline" size={20} color="white" />
              <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>
  
            <Pressable 
              style={styles.switchContainer} 
              onPress={() => router.push('/login')}
            >
              <Text style={[styles.switchText, { color: theme.secondaryText }]}>
                Already have an account? Sign In
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
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
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 16,
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
      marginLeft: 8,
    },
    switchContainer: {
      marginTop: 16,
      alignItems: 'center',
    },
    switchText: {
      fontSize: 14,
      textDecorationLine: 'underline',
    },
  });
  