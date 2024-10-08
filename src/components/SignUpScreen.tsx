import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import auth from '@react-native-firebase/auth';

type SignUpScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "SignUp">,
};

export function SignUpScreen({ navigation }: SignUpScreenProps) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSignUp = async () => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
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
            <button onTap={handleSignUp} style={styles.button}>
                Sign Up
            </button>
            <button onTap={() => navigation.navigate("Login")} style={styles.linkButton}>
                Already have an account? Login
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
        backgroundColor: "#2ecc71",
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