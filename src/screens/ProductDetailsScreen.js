import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import FavoriteButtton from "../components/FavoriteButtton";
import ShowMore from "../components/ShowMore";
import Headline2 from "../components/texts/Headline2";
import Headline3 from "../components/texts/Headline3";
import MediumTextBold from "../components/texts/MediumTextBold";
import Smalltext from "../components/texts/Smalltext";
import { addToCart } from "../store/actions/cart";
import { toggleFavorite } from "../store/actions/products";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const ProductDetailsScreen = ({ route, navigation }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const id = route.params?.id;
    const product = useSelector((state) =>
        state.products.products.find((prod) => prod.id === id)
    );
    //verificamos si este producto esta en favoritos
    const isFav = useSelector((state) =>
        state.products.favorites.some((prod) => prod.id === product?.id)
    );
    //verficamos si ya existe en el carrito
    const thisCart = useSelector((state) => state.cart.items[product?.id]);

    //restamos el descuento al precio del producto
    const realPrice = parseInt(product.price) - parseInt(product.discount);

    const buy = () => {
        dispatch(addToCart(product));
        navigation.navigate('Confirm')
    }

    const addToFavorite = () => dispatch(toggleFavorite(product?.id));
    const addCart = () => dispatch(addToCart(product));
    const goBack = () => navigation.goBack();

    return (    
        <SafeAreaView style={styles.main}>
            <Button
                title={`Agregar al carrito # ${thisCart?.quantity || ''}`}
                style={styles.floatButton}
                onPress={addCart}
            />
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                <View style={styles.imageContainer}>
                    <BackButton
                        style={styles.back}
                        onPress={goBack}
                        color="black"
                    />
                    <FavoriteButtton
                        style={styles.fav}
                        onPress={addToFavorite}
                        isFav={isFav}
                    />
                    <Image
                        source={{ uri: product?.image_url }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                    <View
                        style={{
                            ...styles.discount,
                            backgroundColor: colors.sale,
                        }}
                    >
                        <Text style={styles.discountText}>
                            - ${product?.discount}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Headline2>{product?.title}</Headline2>
                        {/* <TouchableOpacity style={{marginVertical: 10, flexDirection: 'row', alignItems: 'center'}} onPress={}>
                            <MaterialCommunityIcons                                
                                name="cart-outline"
                                size={30}
                                color={thisCart ? colors.sale: colors.border}
                                />
                                <Smalltext>{thisCart?.quantity}</Smalltext>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.priceContainer}>
                        <View>
                            <MediumTextBold>Ventas:</MediumTextBold>
                            <Headline3 style={{ color: colors.notification }}>
                                # {product?.sale_count}
                            </Headline3>
                        </View>
                        <View>
                            <MediumTextBold
                                style={{
                                    color: colors.border,
                                    ...styles.price,
                                }}
                            >
                                $ {product.price}
                            </MediumTextBold>
                            <Headline3 style={{ color: colors.sale }}>
                                $ {realPrice}
                            </Headline3>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <MediumTextBold style={{ marginBottom: 10 }}>
                            Descripción:
                        </MediumTextBold>
                        <ShowMore
                            short={product.short_description}
                            large={product?.description}
                        />
                    </View>
                </View>
                <StatusBar style="dark" backgroundColor="white" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    imageContainer: {
        padding: 40,
        backgroundColor: "white",
        position: "relative",
    },
    fav: {
        position: "absolute",
        alignSelf: "flex-end",
        bottom: 10,
    },
    image: {
        width: "100%",
        height: 200,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    discount: {
        position: "absolute",
        top: 30,
        right: 20,
        padding: 10,
        borderRadius: 5,
        transform: [{ rotate: "-45deg" }],
    },
    discountText: {
        fontFamily: "metropolis-semibold",
        fontSize: 16,
        color: "white",
    },
    infoContainer: {
        // backgroundColor: 'red',
        padding: 10,
        flex: 1,
    },
    title: {
        fontFamily: "metropolis-bold",
        fontSize: 20,
        marginTop: 10,
        lineHeight: 28,
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    category: {
        fontSize: 15,
        fontFamily: "metropolis-semibold",
    },
    price: {
        textDecorationLine: "line-through",
        alignSelf: "flex-end",
    },
    floatButton: {
        position: "absolute",
        bottom: 10,
        width: "95%",
        alignSelf: "center",
        zIndex: 1,
    },
    back: {
        position: "absolute",
        top: 20,
        left: 15,
    },
});
