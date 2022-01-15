import { token } from "../../../env";
export const SET_ORDERS = 'SET_ORDERS';
export const SET_ORDER_DETAIL = 'SET_ORDER_DETAIL';
import {clearCart} from './cart'


const API = "https://sandbox.ixaya.net/api";

export const setOrders = () => {    
    return async dispatch => {
        try {            
            const response = await fetch(`${API}/orders`, {
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
            const orders = resData.response.reverse()
            await dispatch({
                type: SET_ORDERS,
                orders: orders,
            });
        } catch (error) {            
            throw new Error("Algo Ocurrió mal, intentalo más tarde");
        }
    }
}

export const getOrderDetails = (id) => {
    return async dispatch => {
        try {            
            const response = await fetch(`${API}/orders/detail`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "X-API-KEY": token,
                },
                body: JSON.stringify({order_id: id})
            });
                
        
            if (!response.ok) {
                throw new Error("Algo Ocurrió mal, intentalo más tarde");
            }            
            const resData = await response.json();
            dispatch({
                type: SET_ORDER_DETAIL,
                order: resData.response,
            });
        } catch (error) {
            // console.log(error);
            throw new Error("Algo Ocurrió mal, intentalo más tarde");
        }

    }
}

export const createOrder = order => {
    
    return async  (dispatch) =>  {        
        try {            
            const response = await fetch(`${API}/orders/create`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "X-API-KEY": token,
                },
                body: JSON.stringify(order)
            });
                
        
            if (!response.ok) {
                throw new Error("Algo Ocurrió mal, intentalo más tarde");
            }                    
            //volvemos a setear las ordenes
            dispatch(setOrders());
            dispatch(clearCart());
        } catch (error) {
            // console.log(error);
            throw new Error("Algo Ocurrió mal, intentalo más tarde");
        }
    }
}