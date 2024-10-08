import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const DashboardScreen = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const snapshot = await firestore().collection('photos').get();
      const fetchedPhotos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPhotos(fetchedPhotos);
    };

    fetchPhotos();
  }, []);

  return (
    <View>
      <Text>Dashboard</Text>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={{ width: 100, height: 100 }} />
        )}
      />
    </View>
  );
};

export default DashboardScreen;