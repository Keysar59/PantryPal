import { Text, View, StyleSheet, Pressable, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors" ;
import React, { useState } from 'react';
import {SERVER_URL} from "../constants/network";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Login() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!email && !password) {
      setError('Email and password cannot be empty.');
      return;
    }
    if (!email) {
      setError('Email cannot be empty.');
      return;
    }
    if (!password) {
      setError('Password cannot be empty.');
      return;
    }
  
    // Check for commas in inputs
    const commaRegex = /,/;
    if (commaRegex.test(email)) {
      setError('Email cannot contain a comma.');
      return;
    }
    if (commaRegex.test(password)) {
      setError('Password cannot contain a comma.');
      return;
    }
  
    setError(''); // Clear errors before sending request
  
    try {
      console.log("sending login")
      const response = await fetch(`${SERVER_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      console.log("sent")
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.detail || 'Login failed. Please try again.');
        return;
      }

      router.push('/home'); // Navigate to home on successful login
      } catch (error) {
        console.error('Login error:', error);
        setError('An error occurred. Please try again later.');
    }
  };
  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView 
        style={styles.flex} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[styles.loginCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
          <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Sign in to continue</Text>
          
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
          
          {error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={20} color="red" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          
          <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSignIn}>
            <Ionicons name="log-in-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
          
          <Pressable 
            style={styles.forgotContainer} 
            onPress={() => router.push('/unlucky')}
          >
            <Text style={[styles.forgotText, { color: theme.secondaryText }]}>Forgot Password?</Text>
          </Pressable>
  
          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <Text style={[styles.dividerText, { color: theme.secondaryText }]}>or</Text>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
          </View>
  
          <Pressable 
            style={[styles.secondaryButton, { borderColor: theme.primary, backgroundColor: theme.card }]} 
            onPress={() => router.push('/new_account')}
          >
            <Ionicons name="person-add-outline" size={20} color={theme.primary} />
            <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>Create Account</Text>
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
  loginCard: {
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
  forgotContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 8,
    fontSize: 14,
  },
  secondaryButton: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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

  