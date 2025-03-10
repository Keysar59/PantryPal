import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';

const ScannerScreen = () => {
    const [isCameraVisible, setCameraVisible] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            console.log('Camera permission status:', status); // Log the permission status
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleScanButtonPress = () => {
        setCameraVisible(true);
        console.log('Button click success');
    };
    const handleBarCodeScanned = ({ type, data }) => {
        console.log('Scan success:', type, data);
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        console.log('No camera permission');
        return <View />; // Render nothing until permission is determined
    }
    if (hasPermission === false) {
        console.log('No access to camera');
        return <Text>No access to camera</Text>; // Handle no permission case
    }
    console.log('Permission check success');

    console.log('isCameraVisible:', isCameraVisible);
    console.log('scanned:', scanned);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scanner 9000</Text>
            {isCameraVisible ? (
                <CameraView
                    style={styles.camera}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39', "qr", "pdf417"],
                        //barcodeTypes: ["qr"],
                    }}
                /*{scanned && (
                  <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
                )}*/
                />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleScanButtonPress}>
                    <Text style={styles.buttonText}>Scan Barcode</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default ScannerScreen;