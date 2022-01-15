import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import es from 'dayjs/locale/es'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import products from "./src/store/reducers/products";
import thunk from "redux-thunk";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeProvider from "./src/context/ThemeContex";
import StackNavigator from "./src/navigation/StackNavigator";
import cart from "./src/store/reducers/cart";
import orders from "./src/store/reducers/orders";
import dayjs from "dayjs";
import address from "./src/store/reducers/address";


dayjs.locale(es)

const rootReducers = combineReducers({
    products: products,
    cart: cart,
    orders: orders,
    address: address
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default function App() {
    const [fontsLoaded] = useFonts({
        "metropolis-black": require("./assets/fonts/Metropolis-Black.otf"),
        "metropolis-bold": require("./assets/fonts/Metropolis-Bold.otf"),
        "metropolis-medium": require("./assets/fonts/Metropolis-Medium.otf"),
        "metropolis-regular": require("./assets/fonts/Metropolis-Regular.otf"),
        "metropolis-semibold": require("./assets/fonts/Metropolis-SemiBold.otf"),
    });

    if (!fontsLoaded) return <AppLoading />;
    return (
        <Provider store={store}>
            <ThemeProvider>
                <SafeAreaProvider>
                    <StackNavigator />
                </SafeAreaProvider>
            </ThemeProvider>
            <StatusBar style="light" />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
