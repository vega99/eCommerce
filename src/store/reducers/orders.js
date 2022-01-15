import { SET_ORDERS, SET_ORDER_DETAIL } from "../actions/orders";

const initialState = {
    allOrders: [],
    orderDetails: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_ORDERS:
            return {
                ...state,
                allOrders: action.orders
            }
        case SET_ORDER_DETAIL:
            return {
                ...state,
                orderDetails: [...state.orderDetails,action.order]
            }
        default: 
            return state
    }
}

