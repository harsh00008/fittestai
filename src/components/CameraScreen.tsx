import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { Camera } from '@nativescript/core';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

type CameraScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Camera">,
};

export function CameraScreen({ navigation }: CameraScreenProps) {
    const [camera, setCamera] = React.useState<Camera | null>(null);

    React.useEffect(() => {
        const cam = new Camera();
        cam.on(Camera.photoCapturedEvent, onPhotoCaptured);
        setCamera(cam);

        return () => {
            cam.off(Camera.photoCapturedEvent, onPhotoCaptured);
        };
    }, []);

    const onPhotoCaptured = async (args: any) => {
        const capturedPhoto = args.photo;
        const user = auth().currentUser;

        if (user) {
            const photoRef = storage().ref(`photos/${user.uid}/${Date.now()}.jpg`);
            await photoRef.putFile(capturedPhoto.android);
            const photoUrl = await photoRef.getDownloadURL();

            await firestore().collection('photos').add({
                userId: user.uid,
                photoUrl,
                timestamp: firestore.FieldValue.serverTimestamp(),
            });

            navigation.navigate("Dashboard");
        }
    };

    const capturePhoto = () => {
        if (camera) {
            camera.takePicture();
        }
    };

    return (
        <gridLayout rows="*, auto" style={styles.container}>
            <contentView row="0">
                {camera && <cameraView camera={camera} style={styles.camera} />}
            </contentView>
            <button row="1" onTap={capturePhoto} style={styles.captureButton}>
                Capture Photo
            </button>
            <button row="1" onTap={() => navigation.navigate("Dashboard")} style={styles.dashboardButton}>
                Go to Dashboard
            </button>
        </gridLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    camera: {
        height: "100%",
    },
    captureButton: {
        fontSize: 18,
        color: "white",
        backgroundColor: "#e74c3c",
        padding: 10,
        borderRadius: 5,
        textAlignment: "center",
        margin: 10,
    },
    dashboardButton: {
        fontSize: 18,
        color: "white",
        backgroundColor: "#3498db",
        padding: 10,
        borderRadius: 5,
        textAlignment: "center",
        margin: 10,
    },
});