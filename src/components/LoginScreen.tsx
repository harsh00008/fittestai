import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

type LoginScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Login">,
};

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            navigation.navigate("Camera");
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            navigation.navigate("Camera");
        } catch (error) {
            console.error(error);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                throw 'User cancelled the login process';
            }
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                throw 'Something went wrong obtaining access token';
            }
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
            await auth().signInWithCredential(facebookCredential);
            navigation.navigate("Camera");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <textField
                hint="Email"
                keyboardType="email"
                autocorrect={false}
                autocapitalizationType="none"
                style={styles.input}
                onTextChange={(args) => setEmail(args.value)}
            />
            <textField
                hint="Password"
                secure={true}
                style={styles.input}
                onTextChange={(args) => setPassword(args.value)}
            />
            <button onTap={handleLogin} style={styles.button}>
                Login
            </button>
            <button onTap={handleGoogleLogin} style={styles.socialButton}>
                Login with Google
            </button>
            <button onTap={handleFacebookLogin} style={styles.socialButton}>
                Login with Facebook
            </button>
            <button onTap={() => navigation.navigate("SignUp")} style={styles.linkButton}>
                Don't have an account? Sign Up
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    input: {
        width: "80%",
        marginBottom: 10,
        padding: 10,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    button: {
        fontSize: 18,
        color: "white",
        backgroundColor: "#3498db",
        padding: 10,
        borderRadius: 5,
        width: "80%",
        textAlignment: "center",
        marginBottom: 10,
    },
    socialButton: {
        fontSize: 18,
        color: "white",
        backgroundColor: "#34495e",
        padding: 10,
        borderRadius: 5,
        width: "80%",
        textAlignment: "center",
        marginBottom: 10,
    },
    linkButton: {
        fontSize: 16,
        color: "#3498db",
        marginTop: 10,
    },
});