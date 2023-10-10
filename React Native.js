// App.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
import TesseractOcr, { LANG_JAPANESE } from 'react-native-tesseract-ocr';

const App = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [ingredient, setIngredient] = useState('');

  const handleCapture = async (camera) => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      setCapturedImage(data.uri);
    }
  };

  const performOCR = async () => {
    try {
      const ocrResult = await TesseractOcr.recognize(
        capturedImage,
        LANG_JAPANESE,
        {},
      );
      const extractedText = ocrResult.trim();
      setIngredient(extractedText);
    } catch (err) {
      console.error('OCR Error:', err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {capturedImage ? (
          <View style={{ flex: 1 }}>
            <Text>Captured Image:</Text>
            <Text>{ingredient}</Text>
          </View>
        ) : (
          <RNCamera
            style={{ flex: 1 }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.auto}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            captureAudio={false}
          >
            {({ camera, status, recordAudioPermissionStatus }) => {
              if (status !== 'READY') return <View />;
              return (
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
                  <Button
                    title="Capture"
                    onPress={() => handleCapture(camera)}
                  />
                </View>
              );
            }}
          </RNCamera>
        )}
      </View>
      {capturedImage && (
        <View style={{ padding: 20 }}>
          <Button title="Perform OCR" onPress={performOCR} />
        </View>
      )}
    </View>
  );
};

export default App;
