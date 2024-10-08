import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Dashboard() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const querySnapshot = await getDocs(collection(db, 'photos'));
      const fetchedPhotos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPhotos(fetchedPhotos);
    };

    fetchPhotos();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/capture">Take a Photo</Link>
      <div>
        {photos.map(photo => (
          <img key={photo.id} src={photo.url} alt="Fitness" style={{ width: 100, height: 100, margin: 5 }} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;