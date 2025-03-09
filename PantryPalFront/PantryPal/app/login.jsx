  import { Text, View, StyleSheet, Pressable, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';

  import { Ionicons } from "@expo/vector-icons";
  import { useRouter } from "expo-router";
  
  const Colors = {
    light: {
      background: '#F2F2F7',
      card: '#FFFFFF',
      text: '#000000',
      secondaryText: '#8E8E93',
      border: '#E5E5EA',
      primary: '#007AFF',
    },
    dark: {
      background: '#000000',
      card: '#1C1C1E',
      text: '#FFFFFF',
      secondaryText: '#8E8E93',
      border: '#38383A',
      primary: '#0A84FF',
    },
  };
  
  export default function Login() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
  
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
            />
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              placeholder="Password"
              placeholderTextColor={theme.secondaryText}
              secureTextEntry
            />
            
            <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={() => router.push('/home')}>
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
  });





//   import React, { useState } from 'react';
// import { 
//   Text, 
//   View, 
//   StyleSheet, 
//   Pressable, 
//   SafeAreaView, 
//   TextInput, 
//   KeyboardAvoidingView, 
//   Platform, 
//   useColorScheme 
// } from 'react-native';
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// const Colors = {
//   light: {
//     background: '#F2F2F7',
//     card: '#FFFFFF',
//     text: '#000000',
//     secondaryText: '#8E8E93',
//     border: '#E5E5EA',
//     primary: '#007AFF',
//   },
//   dark: {
//     background: '#000000',
//     card: '#1C1C1E',
//     text: '#FFFFFF',
//     secondaryText: '#8E8E93',
//     border: '#38383A',
//     primary: '#0A84FF',
//   },
// };

// export default function Index() {
//   const router = useRouter();
//   const colorScheme = useColorScheme();
//   const theme = Colors[colorScheme ?? 'light'];

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   // This function sends a POST request to the server
//   // Replace 'https://your-server.com/api/login' with your actual API endpoint.
//   async function handleSignIn() {
//     try {
//       const response = await fetch('https://your-server.com/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (response.ok && data.token) {
//         // Optionally, store the token and update your auth state here.
//         router.push('/dashboard'); // Navigate to the next page (e.g., dashboard)
//       } else {
//         setError(data.message || 'Login failed. Please check your credentials.');
//       }
//     } catch (err) {
//       setError('An error occurred: ' + err.message);
//     }
//   }

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <KeyboardAvoidingView 
//         style={styles.flex} 
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <View style={[styles.loginCard, { backgroundColor: theme.card }]}>
//           <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
//           <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Sign in to continue</Text>
          
//           <TextInput
//             style={[styles.input, { borderColor: theme.border, color: theme.text }]}
//             placeholder="Email"
//             placeholderTextColor={theme.secondaryText}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             onChangeText={setEmail}
//             value={email}
//           />
//           <TextInput
//             style={[styles.input, { borderColor: theme.border, color: theme.text }]}
//             placeholder="Password"
//             placeholderTextColor={theme.secondaryText}
//             secureTextEntry
//             onChangeText={setPassword}
//             value={password}
//           />

//           {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
//           <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSignIn}>
//             <Ionicons name="log-in-outline" size={20} color="white" />
//             <Text style={styles.buttonText}>Sign In</Text>
//           </Pressable>
          
//           <Pressable 
//             style={styles.forgotContainer} 
//             onPress={() => router.push('/unlucky')}
//           >
//             <Text style={[styles.forgotText, { color: theme.secondaryText }]}>Forgot Password?</Text>
//           </Pressable>
  
//           <View style={styles.dividerContainer}>
//             <View style={[styles.divider, { backgroundColor: theme.border }]} />
//             <Text style={[styles.dividerText, { color: theme.secondaryText }]}>or</Text>
//             <View style={[styles.divider, { backgroundColor: theme.border }]} />
//           </View>
  
//           <Pressable 
//             style={[styles.secondaryButton, { borderColor: theme.primary, backgroundColor: theme.card }]} 
//             onPress={() => router.push('/new_account')}
//           >
//             <Ionicons name="person-add-outline" size={20} color={theme.primary} />
//             <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>Create Account</Text>
//           </Pressable>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   loginCard: {
//     borderRadius: 12,
//     padding: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 12,
//     padding: 12,
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   button: {
//     flexDirection: 'row',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 8,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
//   forgotContainer: {
//     marginTop: 16,
//     alignItems: 'center',
//   },
//   forgotText: {
//     fontSize: 14,
//     textDecorationLine: 'underline',
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 16,
//   },
//   divider: {
//     flex: 1,
//     height: 1,
//   },
//   dividerText: {
//     marginHorizontal: 8,
//     fontSize: 14,
//   },
//   secondaryButton: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   secondaryButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
// });

  