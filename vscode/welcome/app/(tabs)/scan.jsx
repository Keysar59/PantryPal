import { View, Text, StyleSheet, Button, Platform, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useZxing } from 'react-zxing';
import { Audio, Video } from 'expo-av';

const WebScanner = ({ onResult }) => {
  const [isScanning, setIsScanning] = useState(true);
  const videoRef = useRef(null);
  const { ref } = useZxing({
    formats: ['EAN_13', 'EAN_8', 'UPC_A', 'UPC_E', 'CODE_128', 'CODE_39'],
    onDecodeResult(result) {
      console.log('Barcode detected:', result.getText());
      setIsScanning(false);
      onResult({ type: 'barcode', data: result.getText() });
    },
    onError(error) {
      console.error('Scanning error:', error);
    },
    constraints: {
      video: {
        facingMode: 'environment',
        width: { min: 320, ideal: 1280, max: 1920 },
        height: { min: 240, ideal: 720, max: 1080 },
      }
    },
    timeBetweenDecodingAttempts: 50,
    tryHarder: true,
    paused: false
  });

  useEffect(() => {
    console.log('Scanner mounted, isScanning:', isScanning);
    setIsScanning(true);
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <video
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
      autoPlay
      playsInline
      muted
    />
  );
};

const ScanScreen = () => {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const isWeb = Platform.OS === 'web';
  const [isCameraActive, setIsCameraActive] = useState(true);
  const flashAnimation = useRef(new Animated.Value(0)).current;
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!isWeb) {
      const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      };
      getCameraPermissions();
    }
  }, []);

  const playSuccessSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/Bo-Lamelia.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const triggerSuccessAnimation = () => {
    Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBarCodeScanned = async (result) => {
    if (!isCameraActive) return; // Prevent multiple scans
    
    setIsCameraActive(false);
    const validTypes = [
      'ean13',
      'ean8',
      'upc',
      'code128',
      'code39'
    ];

    if (isWeb) {
      setScannedData({ type: result.type, data: result.data });
    } else {
      if (!validTypes.includes(result.type.toLowerCase())) {
        return;
      }
      setScannedData(result);
    }

    await playSuccessSound();
    triggerSuccessAnimation();
  };

  const handleScanAgain = () => {
    setScannedData(null);
    setIsCameraActive(true);
    setKey(prev => prev + 1);
  };

  // Early returns for permission checks
  if (!isWeb && hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!isWeb && hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Scanner</Text>
      
      {!scannedData && isCameraActive && (
        <View style={styles.cameraContainer}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: '#00ff00',
                opacity: flashAnimation,
                zIndex: 1,
              },
            ]}
          />
          {isWeb ? (
            <WebScanner 
              key={key} 
              onResult={handleBarCodeScanned} 
            />
          ) : hasPermission ? (
            <Camera
              style={styles.camera}
              onBarCodeScanned={isCameraActive ? handleBarCodeScanned : undefined}
              barCodeScannerSettings={{
                barCodeTypes: [
                  'ean13',
                  'ean8',
                  'upc',
                  'code128',
                  'code39'
                ],
              }}
            />
          ) : null}
          <Text style={styles.description}>
            Position a product barcode in view to scan
          </Text>
        </View>
      )}

      {scannedData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Successfully Scanned!</Text>
          <Text style={styles.resultText}>
            Barcode: {scannedData.data}
          </Text>
          <Button 
            title="Scan Another Product" 
            onPress={handleScanAgain}
          />
        </View>
      )}
      
      <Button 
        title="Go Back" 
        onPress={() => router.back()} 
      />
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginVertical: 20,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
  },
}); 