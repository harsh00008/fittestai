import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { LoginScreen } from "./LoginScreen";
import { SignUpScreen } from "./SignUpScreen";
import { CameraScreen } from "./CameraScreen";
import { DashboardScreen } from "./DashboardScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}
        >
            <StackNavigator.Screen
                name="Login"
                component={LoginScreen}
            />
            <StackNavigator.Screen
                name="SignUp"
                component={SignUpScreen}
            />
            <StackNavigator.Screen
                name="Camera"
                component={CameraScreen}
            />
            <StackNavigator.Screen
                name="Dashboard"
                component={DashboardScreen}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);