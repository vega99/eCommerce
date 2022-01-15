import CartItem from "../../models/CartItem";
import { REMOVEE_FROM_CART, CLEAR_CART, ADD_TO_CART } from "../actions/cart";


const initialState = {
    items: {},
    totalAmount: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;                   
            //le quitamos el descuento al precio del producto
            const realPrice = parseInt(addedProduct.price) - parseInt(addedProduct.discount);

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                //ya tenemos este producto en el carrito, se le sumará uno en cantidad
                updatedOrNewCartItem = new CartItem(
                    addedProduct.id,
                    addedProduct.title,
                    addedProduct.image_url,
                    addedProduct.price,
                    addedProduct.discount,
                    state.items[addedProduct.id].quantity + 1,
                    state.items[addedProduct.id].sum + realPrice
                );
            } else {
                //es la primera vez que lo agregamos al carrito
                updatedOrNewCartItem = new CartItem(
                    addedProduct.id,
                    addedProduct.title,
                    addedProduct.image_url,
                    addedProduct.price,
                    addedProduct.discount,
                    1,
                    realPrice
                );
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: updatedOrNewCartItem,
                },
                //sumamos el precio real a la suma total del carrito
                totalAmount: state.totalAmount + realPrice,
            };



        case REMOVEE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            //restamos el descuento al precio del producto
            const realPric = parseInt(selectedCartItem.price) - parseInt(selectedCartItem.discount);
            const currentQty = selectedCartItem.quantity;
            
            let updatedCartItems;
            if (currentQty > 1) {
              //necesitamos quitarlo uno, no borrarlo
               const updatedCartItem = new CartItem(
                selectedCartItem.id,
                selectedCartItem.title,
                selectedCartItem.image_url,
                selectedCartItem.price,
                selectedCartItem.discount,
                selectedCartItem.quantity - 1,
                selectedCartItem.sum - realPric
              );
              updatedCartItems = {...state.items, [action.pid]: updatedCartItem}
            } else {
               updatedCartItems = { ...state.items };
              delete updatedCartItems[action.pid];
            }
            
            return {
              ...state,
              items: updatedCartItems,
              //restamos el precio real a la suma total del carrito
              totalAmount: state.totalAmount - realPric
            }

        case CLEAR_CART:
            return initialState

        default:
            return state;
    }
};
