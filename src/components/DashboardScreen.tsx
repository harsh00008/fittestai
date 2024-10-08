import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type DashboardScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Dashboard">,
};

interface Photo {
    id: string;
    photoUrl: string;
    timestamp: any;
}

export function DashboardScreen({ navigation }: DashboardScreenProps) {
    const [photos, setPhotos] = React.useState<Photo[]>([]);

    React.useEffect(() => {
        const user = auth().currentUser;
        if (user) {
            const unsubscribe = firestore()
                .collection('photos')
                .where('userId', '==', user.uid)
                .orderBy('timestamp', 'desc')
                .onSnapshot(querySnapshot => {
                    const photoList: Photo[] = [];
                    querySnapshot.forEach(doc => {
                        photoList.push({
                            id: doc.id,
                            photoUrl: doc.data().photoUrl,
                            timestamp: doc.data().timestamp,
                        });
                    });
                    setPhotos(photoList);
                });

            return () => unsubscribe();
        }
    }, []);

    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.navigate("Login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <label style={styles.title}>Your Fitness Photos</label>
            <scrollView style={styles.photoList}>
                <wrapLayout>
                    {photos.map(photo => (
                        <image key={photo.id} src={photo.photoUrl} style={styles.photo} />
                    ))}
                </wrapLayout>
            </scrollView>
            <button onTap={() => navigation.navigate("Camera")} style={styles.cameraButton}>
                Take New Photo
            </button>
            <button onTap={handleLogout} style={styles.logoutButton}>
                Logout
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlignment: "center",
    },
    photoList: {
        height: "70%",
    },
    photo: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 10,
    },
    cameraButton: {
        fontSize: 18,
        color: "white",
        backgroundColor: "#3498db",
        padding: 10,
        borderRadius: 5,
        textAlignment: "center",
        marginTop: 20,
    },
    logoutButton: {
        fontSize: 18,
        color: "white",
        backgroundColor: "#e74c3c",
        padding: 10,
        borderRadius: 5,
        textAlignment: "center",
        marginTop: 10,
    },
});