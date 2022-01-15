import { SET_ADDRESS } from "../actions/address";

const initialState = {
    myAddress: {}
}

export default (state = initialState, action)=> {
    switch (action.type) {
        case SET_ADDRESS:
            return {
                myAddress: action.address
            }    
        default:
            return state
    }
}