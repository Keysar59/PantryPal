import { useState } from "react";
import { BarcodeScanner } from "../components/BarcodeScanner";

export const BarcodeScanScreen = () => {
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = (result: string) => {
    setScannedCode(result);
    setError(null);
  };

  const handleError = (error: Error) => {
    setError(error.message);
    console.error("Scanning error:", error);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Scan Barcode
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-white p-4 rounded-lg shadow-md">
          <BarcodeScanner 
            onResult={handleScan} 
            onError={handleError}
          />
          
          {scannedCode && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Scanned Result:
              </h2>
              <div className="mt-2 p-3 bg-gray-100 rounded-md break-all">
                {scannedCode}
              </div>
              <button
                onClick={() => setScannedCode(null)}
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Scan New Code
              </button>
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Position the barcode within the camera view to scan
        </p>
      </div>
    </div>
  );
}; 