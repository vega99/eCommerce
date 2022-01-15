import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const FavoriteButtton = ({ onPress, style, isFav }) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...style,
                backgroundColor: colors.background,
            }}
            onPress={onPress}
        >
            {/* Si es favorto ponemos un ícono diferente */}
            {isFav ? <Ionicons name="heart" size={24} color={colors.primary} /> : <Ionicons name="heart-outline" size={24} color={colors.border} />

            }
        </TouchableOpacity>
    );
};

export default FavoriteButtton;

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 100,
    },
});
