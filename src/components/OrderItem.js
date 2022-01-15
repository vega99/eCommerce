import { useNavigation, useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
// import es from 'dayjs/locale/es'
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import Card from "./Card";
import MediumTextBold from "./texts/MediumTextBold";
import Smalltext from "./texts/Smalltext";
import Smalltext2 from "./texts/SmallText2";
import SmallText2 from "./texts/SmallText2";

// dayjs.locale(es);



const OrderItem = ({ item }) => {
    const navigation = useNavigation()
    const {colors} = useTheme()

    const goToDetails = () => navigation.navigate('OrderDetails',{orderId: item.id})
    return (
        <Card style={styles.card}>
            <View style={styles.orderCotainer}>
                <MediumTextBold style={{ marginRight: 4 }}>
                    Orden: {item.order_code}
                </MediumTextBold>
                <SmallText2>
                    {dayjs(item.last_date).format("ddd MMM DD, YYYY")} 
                </SmallText2>
            </View>
            <View style={styles.direction}>
                <Smalltext2 style={{marginRight: 10}}>Dirección Envio:</Smalltext2>
                <MediumTextBold>{item.address}</MediumTextBold>
            </View>
            <View style={styles.orderCotainer}>
                <View style={styles.direction}>
                    <Smalltext2 style={{marginRight: 10}}>Subtotal:</Smalltext2>
                    <MediumTextBold>${item.subtotal}</MediumTextBold>
                </View>
                <View style={styles.direction}>
                    <Smalltext2 style={{marginRight: 10}}>Total:</Smalltext2>
                    <MediumTextBold>${item.total}</MediumTextBold>
                </View>
            </View>
            <View style={styles.orderCotainer}>
                <Button title="Detalles" outline={true} style={{padding: 10}} onPress={goToDetails}/>
                <Smalltext style={{color: colors.notification}}>Entregado</Smalltext>
            </View>
        </Card>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        padding: 10,  
        marginHorizontal: 10      
    },
    orderCotainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginVertical: 5
    },
    direction: {
        flexDirection: "row",
        alignItems: "center",        
        flexWrap: "wrap",
        marginVertical: 5
    },
});
