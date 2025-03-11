import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      
      <Stack.Screen 
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="group"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="unlucky"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="new_account"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="add_product"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="new_group"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="join_group"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="scanner"
        options={{
          headerShown: false,
        }}
      />
      
    </Stack>
  );
}