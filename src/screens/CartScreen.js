import { useTheme } from "@react-navigation/native";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import Headline from "../components/texts/Headline";
import Headline3 from "../components/texts/Headline3";
import MediumTextBold from "../components/texts/MediumTextBold";
import { clearCart } from "../store/actions/cart";

const CartScreen = ({navigation}) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const total = useSelector((state) => state.cart.totalAmount);

    // //los items del carrito están alamacenados dentro de un objeto, así que
    // los convertimos a array
    const items = useSelector((state) => {
        const transformedData = [];
        for (const key in state.cart.items) {
            transformedData.push({
                id: state.cart.items[key].id,
                title: state.cart.items[key].title,
                image_url: state.cart.items[key].image_url,
                discount: state.cart.items[key].discount,
                price: state.cart.items[key].price,
                quanity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedData;
    });

    const goToConfirm = () => navigation.navigate('Confirm')

    const clearAll = () => dispatch(clearCart());


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Headline title="Carrito" />
                <TouchableOpacity style={styles.clean} onPress={clearAll}>
                    <MediumTextBold style={{ color: colors.sale }}>
                        Limpiar
                    </MediumTextBold>
                </TouchableOpacity>
                <View style={{paddingHorizontal: 10}}>
                    {items.map((item) => (
                        <CartItem item={item} key={item.id} />
                    ))}
                </View>
            </ScrollView>
            <View style={{ ...styles.footer }}>
                <View style={styles.priceContainer}>
                    <MediumTextBold style={{ color: colors.border }}>
                        Total:
                    </MediumTextBold>
                    <Headline3>$ {total}</Headline3>
                </View>
                <Button title="Comprar" disabled={total === 0} onPress={goToConfirm}/>
            </View>
        </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    clean: {
        alignSelf: "flex-end",
        marginHorizontal: 15,
        paddingVertical: 5,
    },
    footer: {
        width: "100%",
        alignSelf: "flex-end",
        marginVertical: 10,
        paddingHorizontal: 10,
        height: 90,
        justifyContent: "space-between",
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // marginVertical: 10,
        // height: 60
    },
});
