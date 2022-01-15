import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    View,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Headline from "../components/texts/Headline";
import Smalltext from "../components/texts/Smalltext";
import { setAddress } from "../store/actions/address";

const FormScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const address = useSelector((state) => state.address.myAddress);

    const onSubmit = (data) => {
        reset();
        dispatch(setAddress(data));
        navigation.goBack()
    };

    console.log(address)
    const {        
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        control,
    } = useForm({});

    useEffect(() => {
        if (address) {
            setValue("street_name", address.street_name);
            setValue("zip_code", address.zip_code);
            setValue("city", address.city);
            setValue("state", address.state);
            setValue("address", address.address);
            setValue("phone", address.phone);
        }
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "android" ? 1000 : 0}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <BackButton
                            style={styles.back}
                            color={colors.text}
                            onPress={() => navigation.goBack()}
                        />
                        <Headline title="Dirección" />
                        <Controller
                            name="street_name"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <View>
                                    <TextInput
                                        placeholder="Calle"
                                        placeholderTextColor={colors.border}
                                        style={{
                                            ...styles.input,
                                            color: colors.border,
                                            backgroundColor: colors.card,
                                        }}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                    {errors.street_name && (
                                        <View>
                                            <Smalltext
                                                style={{
                                                    color: colors.sale,
                                                    ...styles.errorMessage,
                                                }}
                                            >
                                                Este campo es requerido
                                            </Smalltext>
                                        </View>
                                    )}
                                </View>
                            )}
                        />

                        <Controller
                            name="address"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <View>
                                    <TextInput
                                        placeholder="Colonia, dirección..."
                                        placeholderTextColor={colors.border}
                                        style={{
                                            ...styles.input,
                                            color: colors.border,
                                            backgroundColor: colors.card,
                                        }}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                    {errors.address && (
                                        <View>
                                            <Smalltext
                                                style={{
                                                    color: colors.sale,
                                                    ...styles.errorMessage,
                                                }}
                                            >
                                                Este campo es requerido
                                            </Smalltext>
                                        </View>
                                    )}
                                </View>
                            )}
                        />
                        <Controller
                            name="zip_code"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <View>
                                    <TextInput
                                        placeholder="Código Postal"
                                        keyboardType="number-pad"
                                        placeholderTextColor={colors.border}
                                        style={{
                                            ...styles.input,
                                            color: colors.border,
                                            backgroundColor: colors.card,
                                        }}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                    {errors.zip_code && (
                                        <View>
                                            <Smalltext
                                                style={{
                                                    color: colors.sale,
                                                    ...styles.errorMessage,
                                                }}
                                            >
                                                Este campo es requerido
                                            </Smalltext>
                                        </View>
                                    )}
                                </View>
                            )}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <View>
                                    <TextInput
                                        placeholder="Teléfono"
                                        keyboardType="number-pad"
                                        placeholderTextColor={colors.border}
                                        style={{
                                            ...styles.input,
                                            color: colors.border,
                                            backgroundColor: colors.card,
                                        }}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                    {errors.phone && (
                                        <View>
                                            <Smalltext
                                                style={{
                                                    color: colors.sale,
                                                    ...styles.errorMessage,
                                                }}
                                            >
                                                Este campo es requerido
                                            </Smalltext>
                                        </View>
                                    )}
                                </View>
                            )}
                        />
                        <Controller
                            name="state"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <View>
                                    <TextInput
                                        placeholder="Estado"
                                        placeholderTextColor={colors.border}
                                        style={{
                                            ...styles.input,
                                            color: colors.border,
                                            backgroundColor: colors.card,
                                        }}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                    {errors.state && (
                                        <View>
                                            <Smalltext
                                                style={{
                                                    color: colors.sale,
                                                    ...styles.errorMessage,
                                                }}
                                            >
                                                Este campo es requerido
                                            </Smalltext>
                                        </View>
                                    )}
                                </View>
                            )}
                        />
                        <Controller
                            name="city"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <View>
                                    <TextInput
                                        placeholder="Ciudad"
                                        placeholderTextColor={colors.border}
                                        style={{
                                            ...styles.input,
                                            color: colors.border,
                                            backgroundColor: colors.card,
                                        }}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                    {errors.city && (
                                        <View>
                                            <Smalltext
                                                style={{
                                                    color: colors.sale,
                                                    ...styles.errorMessage,
                                                }}
                                            >
                                                Este campo es requerido
                                            </Smalltext>
                                        </View>
                                    )}
                                </View>
                            )}
                        />

                        <Button
                            title={address.street_name ? "Editar" : "Agregar"}
                            outline
                            style={{ marginVertical: 10 }}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default FormScreen;

const styles = StyleSheet.create({
    input: {
        padding: 15,
        borderRadius: 4,
        marginVertical: 10,
    },
    errorMessage: {
        marginLeft: 5,
    },
    back: {
        position: "absolute",
        top: 30,
        left: 15,
        zIndex: 1,
    },
});
