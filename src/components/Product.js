import { useTheme } from "@react-navigation/native";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/actions/products";
import Card from "./Card";
import FavoriteButtton from "./FavoriteButtton";
import MediumTextBold from "./texts/MediumTextBold";
import Smalltext from "./texts/Smalltext";

const viewWidth = Dimensions.get("window").width;
const itemWidth = (viewWidth - 40) / 2;

const Product = ({ item, navigation }) => {
    const dispatch = useDispatch();
    const { colors } = useTheme();

    //le restamos el descuento al precio del producto
    const finalPrice = parseInt(item.price) - parseInt(item.discount);
    //verificamos si este producto está en la lista de favoritos
    const isFav = useSelector((state) =>
        state.products.favorites.some((fav) => fav.id === item.id)
    );
    return (
        <Card style={styles.wrapper}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("ProductDetails", { id: item.id })
                }
            >
                <ImageBackground
                    source={{ uri: item.image_url }}
                    style={styles.image}
                    imageStyle={{ borderRadius: 4 }}
                    resizeMode="cover"
                >
                    <View style={styles.insideBg}>
                        <View
                            style={{
                                ...styles.discoutWrapper,
                                backgroundColor: colors.sale,
                            }}
                        >
                            <Smalltext style={styles.discount}>
                                $ -{item.discount}
                            </Smalltext>
                        </View>
                        <FavoriteButtton
                            style={styles.icon}
                            onPress={() => dispatch(toggleFavorite(item.id))}
                            isFav={isFav}
                        />
                    </View>
                </ImageBackground>
                <View style={styles.info}>
                    <MediumTextBold numberOfLines={2} ellipsizeMode="tail">
                        {item.title}
                    </MediumTextBold>
                    <View style={styles.priceWrapper}>
                        <Smalltext style={styles.price}>
                            ${item.price}
                        </Smalltext>
                        <Smalltext style={{ color: colors.primary }}>
                            ${finalPrice}
                        </Smalltext>
                    </View>
                </View>
            </TouchableOpacity>
        </Card>
    );
};

export default Product;

const styles = StyleSheet.create({
    wrapper: {
        width: itemWidth,
        margin: 10,
    },
    image: {
        width: "100%",
        height: 184,
    },
    insideBg: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: "space-between",
    },
    discoutWrapper: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 5,
        width: 60,
    },
    discount: {
        color: "white",
        fontSize: 11,
    },
    icon: {
        alignSelf: "flex-end",
        position: "absolute",
        bottom: -15,
    },
    info: {
        paddingVertical: 11,
        paddingHorizontal: 5,
        flex: 1,
    },
    title: {
        fontFamily: "metropolis-semibold",
        lineHeight: 20,
    },
    priceWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        flexWrap: "wrap",
    },
    price: {
        textDecorationLine: "line-through",
        marginRight: 10,
    },
});
