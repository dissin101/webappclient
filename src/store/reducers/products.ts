import * as types from "../constants/products";
import {AnyAction} from "redux";
import {IProduct} from "../../models/product";

interface IInitialState {
    loading: boolean
    data: IProduct[] | []
    error: string | null
}

const initialState: IInitialState = {
    loading: false,
    data: [],
    error: null
};

export const products = (state = initialState, action: AnyAction) => {
    switch (action.type){
        case types.GET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                data: [],
                error: null
            }
        case types.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        case types.GET_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}