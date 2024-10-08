import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DashboardScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      const unsubscribe = firestore()
        .collection('photos')
        .where('userId', '==', user.uid)
        .orderBy('timestamp', 'desc')
        .onSnapshot(querySnapshot => {
          const photoList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setPhotos(photoList);
        });

      return () => unsubscribe();
    }
  }, []);

  const renderPhoto = ({ item }) => (
    <Image source={{ uri: item.url }} style={styles.photo} />
  );

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Fitness Photos</Text>
      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={item => item.id}
        numColumns={3}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.buttonText}>Take New Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  photo: {
    width: '33%',
    aspectRatio: 1,
    margin: 1,
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DashboardScreen;