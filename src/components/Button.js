import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Smalltext from "./texts/Smalltext";

const Button = ({ onPress, title, style, outline, disabled,loading, ...rest }) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: outline ? "transparent" : colors.primary },
                outline ? { borderWidth: 1, borderColor: colors.text } : null,
                style,
                disabled && { backgroundColor: colors.border}
            ]}
            activeOpacity={0.6}
            onPress={onPress}
            {...rest}
            disabled={disabled}
        >
            {loading ? (
                <>
                    <ActivityIndicator color="white" size="large" />
                </>

            ) : (
                <>
                    <Smalltext
                        style={{
                            ...styles.title,
                            ...{
                                color: outline ? colors.text : "white",
                            },
                        }}
                    >
                        {title}
                    </Smalltext>
                </>
            )}
        </TouchableOpacity>
    );
    s;
};

export default Button;

const styles = StyleSheet.create({
    button: {
        padding: 13,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        textTransform: "uppercase",
    },
});
