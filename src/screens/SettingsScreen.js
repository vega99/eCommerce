import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import {
    StyleSheet,
    View,
    Switch,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Headline from "../components/texts/Headline";
import MediumTextBold from "../components/texts/MediumTextBold";
import Smalltext from "../components/texts/Smalltext";
import Smalltext2 from "../components/texts/SmallText2";
import useThemeColor from "../hooks/useThemeColor";

const SettingsScreen = ({navigation}) => {
    const { colors } = useTheme();
    const { isDark, toggleTheme } = useThemeColor();
    const address = useSelector(state => state.address.myAddress)

    const goToForm = () => navigation.navigate('Form')

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView contentContainerStyle={{ padding: 10 }}>
                <Headline title="Settings" />
                <MediumTextBold style={{ marginVertical: 10 }}>
                    Información Personal
                </MediumTextBold>
                <TouchableOpacity style={styles.row} onPress={goToForm}>
                    <View>
                        <Smalltext>Dirección de Envio</Smalltext>
                        <Smalltext2>{`${address?.address || 'Agrega una dirección'}`}</Smalltext2>
                    </View>
                    <Ionicons
                        name="chevron-forward"
                        size={24}
                        color={colors.border}
                    />
                </TouchableOpacity>
                <View style={styles.row}>
                    <View>
                        <Smalltext>Modo Obscuro</Smalltext>
                    </View>
                    <Switch value={isDark} onChange={toggleTheme} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
});
