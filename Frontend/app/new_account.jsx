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
  import { Ionicons, MaterialIcons } from "@expo/vector-icons";
  import { useRouter } from "expo-router";
  import { Colors } from "../constants/Colors" ;
  import React, { useState } from 'react';

  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { SERVER_URL } from '../constants/network';
  
  export default function CreateAccount() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleCreateAccount = async () => {
      
      // Check for empty fields
      if (!email && !password) {
        setError('Email and password cannot be empty.');
        return; 
      }
      if(!email){
        setError('Email cannot be empty.');
        return; 
      }
      if(!password){
        setError('Password cannot be empty.');
        return; 
      }
      
      // Check for commas in inputs
      const commaRegex = /,/; // Regular expression to check for commas
      if (commaRegex.test(email)) {
        setError('Email cannot contain a comma.');
        return;
      }
      if (commaRegex.test(password)) {
        setError('Password cannot contain a comma.');
        return;
      }
      // Check if passwords match
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      setError('');
      console.log("serverurl:", SERVER_URL);

      try {
        const response = await fetch(`${SERVER_URL}auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          setError(data.detail || 'Sign up failed. Please try again.');
          return;
        }
    
        // Store token (if authentication is successful)
        // if (Platform.OS === 'web') {
        //   localStorage.setItem('token', data.access_token);
        // } else {
        //   await AsyncStorage.setItem('token', data.access_token);
        // }


        router.push('/home'); // Navigate to home on successful login
      } catch (error) {
        console.error('Login error:', error);
        setError('An error occurred. Please try again later.');
      }
  
      setError(''); // Clear error if inputs are valid
      // Add your create account logic here
      router.push('/home'); // Navigate to home or another page after successful account creation
    };
  
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
              placeholder="Email"
              placeholderTextColor={theme.secondaryText}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              placeholder="Password"
              placeholderTextColor={theme.secondaryText}
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              placeholder="Confirm Password"
              placeholderTextColor={theme.secondaryText}
              secureTextEntry
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
            
            {error ? (
              <View style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={20} color="red" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            
            <Pressable 
              style={[styles.button, { backgroundColor: theme.primary }]} 
              onPress={handleCreateAccount}
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
      marginLeft: 8,
      fontWeight: 'bold',
    },
  });
  