import React from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ navigation }) => {
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      navigation.navigate('Camera');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginScreen;