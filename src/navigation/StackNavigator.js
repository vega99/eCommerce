import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
    useTheme,
} from "@react-navigation/native";
import useThemeColor from "../hooks/useThemeColor";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import ConfirmScreen from "../screens/ConfirmScreen";
import FormScreen from "../screens/FormScreen";


const Stack = createNativeStackNavigator();

const customDarkTheme = {
    ...DarkTheme,
    colors: {
        primary: "#EF3651",
        background: "#1E1F28",
        card: "#2A2C36",
        text: "#F6F6F6",
        border: "#ABB4BD",
        notification: "#2AA952",
        sale: "#FF3E3E",
    },
};

const customLightTheme = {
    ...DefaultTheme,
    colors: {
        primary: "#DB3022",
        background: "#F9F9F9",
        card: "#FFFFFF",
        text: "#222222",
        border: "#ABB4BD",
        notification: "#2AA952",
        sale: "#DB3022",
    },
};

const StackNavigator = () => {
    const { isDark } = useThemeColor();
    const { colors } = useTheme();

    return (
        <NavigationContainer
            theme={isDark ? customDarkTheme : customLightTheme}
        >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeTabs" component={TabNavigator} />
                <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetailsScreen}
                    options={{ presentation: "containedModal" }}                    
                />
                <Stack.Screen
                    name="OrderDetails"
                    component={OrderDetailsScreen}
                    options={{ presentation: "containedModal" }}
                />
                <Stack.Screen
                    name="Confirm"
                    component={ConfirmScreen}
                    options={{ presentation: "containedModal" }}
                />
                <Stack.Screen
                    name="Form"
                    component={FormScreen}
                    options={{ presentation: "containedModal" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;
