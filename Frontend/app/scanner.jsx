import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Pressable, useColorScheme, SafeAreaView } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
const communication = require('../src/services/communication');

export default function Scanner() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const colorScheme = useColorScheme();
  console.log(params.group_id);

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
          onPress: () => setScanned(false)
        },
        {
          text: "Add Product",
          onPress: async () => {
            setScanned(false);
            try {
              const product = await communication.getProductByBarcode(data);
              if (!product) {
                Alert.alert(
                  "Product Not Found",
                  "Sorry, we couldn't find a product matching this barcode.",
                  [
                    {
                      text: "Go Back",
                      onPress: () => router.back()
                    }
                  ]
                );
                return;
              }
              router.push(`/${"addProduct"}?product_id=${encodeURIComponent(product.product_id)}&product_name=${encodeURIComponent(product.product_name)}&product_image_url=${encodeURIComponent(product.product_image_url)}&group_id=${encodeURIComponent(params.group_id)}`);
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to fetch product information. Please try again.",
                [
                  {
                    text: "Go Back",
                    onPress: () => router.back()
                  }
                ]
              );
            }
          }
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
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#007AFF" />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}>
          Scan Barcode
        </Text>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39', "pdf417"],
          }}
          style={styles.camera}
        />
        <View style={styles.overlay}>
          <View style={styles.scanArea}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
          </View>
          <Text style={styles.instructionText}>
            Position the barcode within the frame
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}>
          Supported barcodes: EAN-13, EAN-8, UPC, Code 128, Code 39
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 280,
    height: 280,
    position: 'relative',
    marginBottom: 40,
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: '#007AFF',
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: '#007AFF',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#007AFF',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#007AFF',
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
});