import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import mario from "@/assets/images/mario.png"
import { useRouter } from "expo-router"

const app = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={mario}
        resizeMode='cover'
        style={styles.image}
      >
        <Text style={styles.text}>Epic Coffee Shop</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push("/scan")}
        >
          <Text style={styles.buttonText}>Scan Barcode</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center', 
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
})