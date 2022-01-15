import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import InfoItem from "../components/InfoItem";
import Headline from "../components/texts/Headline";
import Headline2 from "../components/texts/Headline2";
import MediumTextBold from "../components/texts/MediumTextBold";
import Smalltext from "../components/texts/Smalltext";
import Smalltext2 from "../components/texts/SmallText2";
import { createOrder, getOrderDetails } from "../store/actions/orders";

const OrderDetailsScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [reloading, setReloading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const id = route.params?.orderId;
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const goBack = () => navigation.goBack();
    const order = useSelector((state) =>
        state.orders.orderDetails.find((ord) => ord.id === id)
    );

    const buyAgain = async () => {
        const prods = order?.products.map((prod) => {
            return {
                product_id: parseInt(prod.id),
                qty: parseInt(prod.qty),
            };
        });

        const newOrder = {
            street_name: order?.street_name,
            zip_code: order?.zip_code,
            city: order?.city,
            state: order?.state,
            address: order?.address,
            phone: order?.phone,
            product_list: prods,
        };

        try {
            setReloading(true);
            await dispatch(createOrder(newOrder));
            setReloading(false);
            goBack();
        } catch (err) {
            setReloading(false);
            console.log(err.message);
        }
    };

    const getOrder = async () => {
        try {
            setLoading(true);
            await dispatch(getOrderDetails(id));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await dispatch(getOrderDetails(id));
            setRefreshing(false);
        } catch (error) {
            setRefreshing(false);
            setError(error.message);
        }
    };

    useEffect(async () => {
        await getOrder();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.centered}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.centered}>
                    <MediumTextBold>{error}</MediumTextBold>
                    <Button
                        title="Intentar de Nuevo"
                        onPress={getOrder}
                        style={{ marginTop: 10 }}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <BackButton
                    color={colors.text}
                    onPress={goBack}
                    style={styles.back}
                />
                <View style={{ width: "70%", alignSelf: "center" }}>
                    <Headline
                        title="Detalles de la Compra"
                        style={styles.title}
                    />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <View style={styles.row}>
                        <View style={{ flexDirection: "row" }}>
                            <Smalltext2 style={{ marginRight: 5 }}>
                                orden:{" "}
                            </Smalltext2>
                            <MediumTextBold>{order?.order_code}</MediumTextBold>
                        </View>
                        <Smalltext style={{ color: colors.notification }}>
                            Entregado
                        </Smalltext>
                    </View>
                    <MediumTextBold style={{ marginVertical: 20 }}>
                        {`${order?.products.length} items`}
                    </MediumTextBold>

                    {order?.products?.map((prod) => (
                        <CartItem key={prod.id} fromOrder={true} item={prod} />
                    ))}
                    <MediumTextBold style={{ marginVertical: 20 }}>
                        Otra Información
                    </MediumTextBold>
                    <InfoItem
                        title="Dirección de Envio:"
                        info={`${order?.address}, ${order?.street_name}. ${order?.state} ${order?.zip_code}`}
                    />
                    <InfoItem
                        title="Fecha:"
                        info={dayjs(order?.last_date).format(
                            "ddd MMM DD, YYYY"
                        )}
                    />
                    <InfoItem
                        title="Descuento:"
                        info={`$ ${order?.discount}`}
                    />
                    <InfoItem title="Subtotal:" info={`$ ${order?.subtotal}`} />
                    <InfoItem title="Total:" info={`$ ${order?.total}`} />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Recomprar"
                            style={styles.button}
                            outline
                            onPress={buyAgain}
                            loading={reloading}
                        />
                        <Button title="Feedback" style={styles.button} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
    safe: { flex: 1, paddingTop: 10 },
    title: {
        textAlign: "center",
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        // padding: 20,
    },
    row: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    back: {
        position: "absolute",
        top: 20,
        left: 15,
        zIndex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    button: { flex: 1, margin: 10 },
});
