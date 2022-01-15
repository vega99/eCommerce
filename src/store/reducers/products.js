import { SET_PRODUCTS, TOGGLE_FAVORIE } from "../actions/products";


const inititalState = {
    products: [],
    favorites: []
}

export default (state = inititalState, action) => {
    switch(action.type){
        case SET_PRODUCTS: {
            return {
                ...state,
                products: action.products
            }
        }
        
        case TOGGLE_FAVORIE:            
            const productIndex = state.favorites.findIndex(prod => prod.id === action.pid);
            if(productIndex >= 0){
                const updatedProducts = [...state.favorites];
                updatedProducts.splice(productIndex, 1);
                return {
                    ...state,
                    favorites: updatedProducts
                }
            } else {
                const product = state.products.find(prod => prod.id === action.pid)
                return {
                    ...state,
                    favorites: state.favorites.concat(product)
                }
            }
        default: 
            return state
    }
}