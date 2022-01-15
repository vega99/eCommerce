import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Empty from "../components/Empty";
import Product from "../components/Product";
import Headline from "../components/texts/Headline";

const FavoritesScreen = ({navigation}) => {

    const favorites = useSelector((state) => state.products.favorites);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Empty />}
                ListHeaderComponent={<Headline title="Favoritos" />}
                renderItem={({ item }) => <Product item={item} navigation={navigation} />}
                numColumns={2}
            />
        </SafeAreaView>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({});
