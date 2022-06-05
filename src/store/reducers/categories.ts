import * as types from "../constants/categories";
import {AnyAction} from "redux";
import {ICategory} from "../../models/category";

interface IInitialState {
    isCategoryAdd: boolean
    loading: boolean
    data: ICategory[] | []
    error: string | null
}

const initialState: IInitialState = {
    isCategoryAdd: false,
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
        case types.ADD_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                isCategoryAdd: false,
                error: null
            }
        case types.ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isCategoryAdd: true,
                error: null
            }
        case types.ADD_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                isCategoryAdd: false,
                error: action.payload
            }
        default: return state
    }
}