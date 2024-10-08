import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = ({ navigation }) => {
  const takePicture = async (camera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
    navigation.navigate('Dashboard');
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      >
        {({ camera }) => (
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => takePicture(camera)}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </RNCamera>
    </View>
  );
};

export default CameraScreen;