import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    DarkTheme,
    NavigationContainer,
    DefaultTheme,
    useTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";


const Tabs = createBottomTabNavigator();

const TabNavigator = () => {

    const { colors } = useTheme();
    const cart = useSelector(state => state.cart.items)
    const favs = useSelector(state => state.products.favorites.length)
    const count = Object.keys(cart).length;
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tab,
                tabBarLabelStyle: styles.label,                
            }}
            sceneContainerStyle={{ backgroundColor: colors.background  }}
        >
            <Tabs.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "Productos",
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" size={26} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarBadge: count > 0 ? count : null,
                    title: "Carrito",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="cart-outline"
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Orders"
                component={OrdersScreen}
                options={{
                    title: "Mis Compras",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome
                            name="shopping-bag"
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarBadge: favs > 0 ? favs : null,
                    title: "Favoritos",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="heart" size={26} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: "Config",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="settings" size={26} color={color} />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

export default TabNavigator;

const styles = StyleSheet.create({
    tab: {
        height: 60,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,         
        borderTopWidth:0,   
    },
    label: {
        fontFamily: "metropolis-semibold",
        fontSize: 10
    },
});
