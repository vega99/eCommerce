import { useTheme } from "@react-navigation/native";
import React, {useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Card from "../components/Card";
import Description from "../components/texts/Description";
import Headline from "../components/texts/Headline";
import Smalltext from "../components/texts/Smalltext";
import Smalltext2 from "../components/texts/SmallText2";
import InfoItem from "../components/InfoItem";
import MediumTextBold from '../components/texts/MediumTextBold'
import {createOrder} from '../store/actions/orders'


const ConfirmScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { colors } = useTheme();
    const dispatch = useDispatch()
    const goBack = () => navigation.goBack();
    const address = useSelector((state) => state.address.myAddress);
    const total = useSelector((state) => state.cart.totalAmount);
    const cart = useSelector((state) => state.cart.items);

    const buy = async () => {
        try {
            setLoading(true)
            const products = Object.keys(cart).map((key) => {
                return {
                    product_id: parseInt(cart[key].id),
                    qty: parseInt(cart[key].quantity),
                };
            });
            address.product_list = products;            
            await dispatch(createOrder(address))
            setLoading(false)
            navigation.popToTop()
        } catch (error) {
            setLoading(false)
            console.log(error.message)
        }

    };

    const units = Object.keys(cart).length;

    return (
        <SafeAreaView style={styles.main}>
            <Headline title="Checkout" />
            <BackButton
                style={styles.back}
                color={colors.text}
                onPress={goBack}
            />
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Card style={styles.card}>
                        {address.street_name ? (
                            <View>
                                <View style={styles.headerCard}>
                                    <Smalltext>{address.city}</Smalltext>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("Form")
                                        }
                                    >
                                        <Smalltext2
                                            style={{ color: colors.sale }}
                                        >
                                            Editar
                                        </Smalltext2>
                                    </TouchableOpacity>
                                </View>
                                <Description>{address.phone}</Description>
                                <Description>{`${address.street_name}, ${address.address}. ${address.state} `}</Description>
                                <InfoItem title="Unidades:" info={units} />
                                <View style={styles.headerCard}>
                                    <Description>Total:</Description>
                                    <MediumTextBold style={{color: colors.notification}}>${total}</MediumTextBold>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.buttonContianer}>
                                <Button
                                    outline
                                    title="Agregar Dirección"
                                    onPress={() => navigation.navigate("Form")}
                                />
                            </View>
                        )}
                    </Card>
                </View>
                <View>
                    <Button
                        title="Realizar pedido"
                        style={{ width: "100%" }}
                        onPress={buy}
                        disabled={address.street_name ? false : true}
                        loading={loading}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    container: {
        margin: 10,
        flex: 1,
        justifyContent: "space-between",
    },
    card: {
        width: "100%",
        padding: 20,
        marginVertical: 10,
    },
    back: {
        position: "absolute",
        top: 55,
        left: 15,
        zIndex: 1,
    },
    headerCard: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonContianer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
    },
});
