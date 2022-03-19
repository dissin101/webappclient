import * as types from "../constants/categories";
import {AnyAction} from "redux";
import {ICategory} from "../../models/category";

interface IInitialState {
    loading: boolean
    data: ICategory[] | []
    error: string | null
}

const initialState: IInitialState = {
    loading: false,
    data: [],
    error: null
};

export const categories = (state = initialState, action: AnyAction) => {
    switch (action.type){
        case types.GET_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                data: [],
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
                data: [],
                error: action.payload
            }
        default: return state
    }
}