import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Description from "./texts/Description";
import Headline3 from "./texts/Headline3";
import MediumTextBold from "./texts/MediumTextBold";
import Smalltext from "./texts/Smalltext";

const ShowMore = ({ short, large }) => {
    const [more, setIsMore] = useState(false);
    const { colors } = useTheme();
    return (
        <View>
            <Description>{more ? large : short}</Description>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setIsMore(!more)}
            >
                <MediumTextBold style={{ ...styles.more, color: colors.text }}>
                    {more ? "menos" : "...más"}
                </MediumTextBold>
            </TouchableOpacity>
        </View>
    );
};

export default ShowMore;

const styles = StyleSheet.create({
    button: {
        alignSelf: "flex-end",
        padding: 10,
    },
    text: {
        // fontFamily: "metropolis-regular",
    },
});
