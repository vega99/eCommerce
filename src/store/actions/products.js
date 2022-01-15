import { token } from "../../../env";

export const SET_PRODUCTS = "SET_PRODUCTS";
export const TOGGLE_FAVORIE = 'TOGGLE_FAVORITE';

const API = "https://sandbox.ixaya.net/api";

export const getProducts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${API}/products`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "X-API-KEY": token,
                },
            });

            if (!response.ok) {
                throw new Error("Algo Ocurrió mal, intentalo más tarde");
            }

            const resData = await response.json();
            dispatch({
                type: SET_PRODUCTS,
                products: resData.response,
            });
        } catch (error) {
            console.log(error.message);
            throw new Error("Algo Ocurrió mal, intentalo más tarde");
        }
    };
};

export const toggleFavorite = id => {
    return {
        type: TOGGLE_FAVORIE,
        pid: id
    }
}


