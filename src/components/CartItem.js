import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import Card from "./Card";
import MediumTextBold from "./texts/MediumTextBold";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/actions/cart";
import Smalltext from "./texts/Smalltext";
import Smalltext2 from "./texts/SmallText2";

const CartItem = ({ item, fromOrder }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const add = () => dispatch(addToCart(item));
    const remove = () => dispatch(removeFromCart(item.id));

    //los convierto a números para que no haya problema al restarlos
    const soldPrice = parseInt(item.price) - parseInt(item.discount);

    return (
        <Card style={styles.card}>
            <TouchableOpacity style={styles.imageWrapper} activeOpacity={0.6}>
                <Image
                    source={{ uri: item.image_url }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <View style={styles.content}>
                <View>
                    <MediumTextBold numberOfLines={1} ellipsizeMode="tail">
                        {item.title}
                    </MediumTextBold>
                    <View style={{ flexDirection: "row", marginTop: 3 }}>
                        <Smalltext2>precio: </Smalltext2>
                        <Smalltext>${soldPrice}</Smalltext>
                    </View>
                </View>
                <View style={styles.footer}>
                    {/* El footer cambiará dinamicamente dependiendo si viene de la pantalla CartScreenn o de la pantalla OrderDetailsScreen  */}
                    {fromOrder ? (
                        <View style={{ flexDirection: "row" }}>
                            <Smalltext2 style={{ marginRight: 10 }}>
                                Unidades:
                            </Smalltext2>
                            <Smalltext>{item.qty}</Smalltext>
                        </View>
                    ) : (
                        <View style={styles.iconCotainer}>
                            <TouchableOpacity onPress={remove}>
                                <AntDesign
                                    name="minuscircle"
                                    size={28}
                                    color={colors.border}
                                />
                            </TouchableOpacity>
                            <MediumTextBold>{item.quanity}</MediumTextBold>
                            <TouchableOpacity onPress={add}>
                                <AntDesign
                                    name="pluscircle"
                                    size={28}
                                    color={colors.border}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    <View>
                        <Smalltext>
                            ${fromOrder ? item.total : item.sum}
                        </Smalltext>
                    </View>
                </View>
            </View>
        </Card>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        // margin: 10
    },
    imageWrapper: {
        backgroundColor: "white",
        borderRadius: 4,
    },
    image: {
        width: 104,
        height: 104,
        borderRadius: 4,
    },
    content: {
        flex: 1,
        padding: 10,
        justifyContent: "space-between",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconCotainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "40%",
    },
});
