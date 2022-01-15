import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";

const Card = ({ style, children }) => {
    const {colors} = useTheme()
    return (
        <View
            style={{
                backgroundColor: colors.card,
                shadowColor: colors.border,
                ...styles.wrapper,
                ...style
            }}
        >
            {children}
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 4,
        marginVertical: 10,                            
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,        
        elevation: 3,
    },
});
