import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    View,
    FlatList,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import useThemeColor from "../hooks/useThemeColor";
import { getProducts } from "../store/actions/products";
import Headline from "../components/texts/Headline";
import Headline3 from "../components/texts/Headline3";
import Button from "../components/Button";
import Empty from "../components/Empty";

const HomeScreen = ({ navigation }) => {
    const [error, setError] = useState("");
    const [isLoading, setIsloading] = useState(true);
    const [refreshing, setIsRefreshing] = useState(false);
    const { colors } = useTheme();
    const { isDark } = useThemeColor();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    const onRefresh = async () => {
        try {
            setIsRefreshing(true);
            await dispatch(getProducts());
            setIsRefreshing(false);
        } catch (error) {
            // console.log(error.message);
            setIsRefreshing(false);
            setError(error.message);
        }
    };

    const fetchProd = async () => {
        try {
            setIsloading(true);
            await dispatch(getProducts());
            setIsloading(false);
        } catch (error) {
            // console.log(error.message);
            setIsloading(false);
            setError(error.message);
        }
    };

    useEffect(async () => {
        await fetchProd();
    }, []);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.main}>
                <View style={styles.centered}>
                    <ActivityIndicator color={colors.primary} size="large" />
                    <StatusBar style={isDark ? "light" : "dark"} />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.main}>
                <View style={styles.centered}>
                    <Headline3>{error}</Headline3>
                    <Button
                        title="Intentar de nuevo"
                        onPress={fetchProd}
                        style={{ marginVertical: 20 }}
                    />
                    <StatusBar style={isDark ? "light" : "dark"} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.main}>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={products}
                keyExtractor={(item) => item.id}
                numColumns={2}
                ListEmptyComponent={<Empty />}
                ListHeaderComponent={<Headline title="Productos" />}
                renderItem={({ item }) => <Product item={item} navigation={navigation} />}                
            />
            <StatusBar style={isDark ? "light" : "dark"} />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    main: {
        flex: 1,
    },
});
