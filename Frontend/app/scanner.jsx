import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, Pressable, useColorScheme } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Scanner() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(
      "Barcode Captured",
      `Bar code with type ${type} and data ${data} has been scanned!`,
      [
        {
          text: "Scan Again",
          style: "cancel",
          onPress:() => setScanned(false)
        },
        {
          text: "Add Product",
          onPress: () => router.push('/add_product')
        }
      ]
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}>
          Scanner
        </Text>
      </View>
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39', "qr", "pdf417"],
          }}
          style={styles.camera}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  camera: {
    width: '100%',
    height: 400,
    borderRadius: 12,
  },
});