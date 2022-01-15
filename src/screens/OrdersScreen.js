import BottomSheet from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    View,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Empty from "../components/Empty";
import OrderItem from "../components/OrderItem";
import Headline from "../components/texts/Headline";
import MediumTextBold from "../components/texts/MediumTextBold";
import useThemeColor from "../hooks/useThemeColor";
import { setOrders } from "../store/actions/orders";


const OrdersScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { colors } = useTheme();
    const { isDark } = useThemeColor();
    const orders = useSelector((state) => state.orders.allOrders);    

    const dispatch = useDispatch();

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await dispatch(setOrders());
            setRefreshing(false);
        } catch (error) {
            // console.log(error.message)
            setRefreshing(false);
            setError(error.message);
        }
    };
    const fetchOrders = async () => {
        try {
            setLoading(true);
            await dispatch(setOrders());
            setLoading(false);
        } catch (error) {
            // console.log(error.message)
            setLoading(false);
            setError(error.message);
        }
    };

    useEffect(async () => {
        await fetchOrders();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <StatusBar style={isDark ? "light" : "dark"} />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.centered}>
                    <MediumTextBold>{error}</MediumTextBold>
                    <Button
                        title="Intertar de nuevo"
                        style={{ marginVertical: 10 }}
                        onPress={fetchOrders}
                    />
                    <StatusBar style={isDark ? "light" : "dark"} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                // contentContainerStyle={{padding: 10}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={orders}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Empty />}
                ListHeaderComponent={<Headline title="Orders" />}
                renderItem={({ item }) => <OrderItem item={item} />}
            />
            <StatusBar style={isDark ? "light" : "dark"} />
        </SafeAreaView>
    );
};

export default OrdersScreen;

const styles = StyleSheet.create({
    centered: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        padding: 20,
    },
});
