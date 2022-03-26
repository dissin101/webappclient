import * as types from "../constants/products";
import {AnyAction} from "redux";
import {IProduct} from "../../models/product";

interface IInitialState {
    loading: boolean
    data: IProduct | null
    error: string | null
}

const initialState: IInitialState = {
    loading: false,
    data: null,
    error: null
};

export const product = (state = initialState, action: AnyAction) => {
    switch (action.type){
        case types.GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        case types.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        case types.GET_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        default: return state
    }
}