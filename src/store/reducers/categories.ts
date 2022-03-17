import * as types from "../constants/categories";
import {AnyAction} from "redux";
import {IModel} from "../../models/model";

interface IInitialState {
    loading: boolean
    data: any | null
    error: string | null
}

const initialState: IInitialState = {
    loading: false,
    data: null,
    error: null
};

export const categories = (state = initialState, action: AnyAction) => {
    switch (action.type){
        case types.GET_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        case types.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        case types.GET_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        default: return state
    }
}