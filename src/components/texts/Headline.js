import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Headline = ({ title, style, ...rest }) => {
    const { colors } = useTheme();
    return (
        <View>
            <Text
                style={{
                    color: colors.text,
                    ...styles.headerTitle,
                    ...style,
                }}
                {...rest}
            >
                {title}
            </Text>
        </View>
    );
};

export default Headline;

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 30,
        fontFamily: "metropolis-semibold",
        marginVertical: 15,
        marginHorizontal: 10,
        textAlign: 'center'
    },
});
