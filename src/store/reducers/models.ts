import * as types from "../constants/models";
import {AnyAction} from "redux";
import {IModel} from "../../models/model";

interface IInitialState {
    isModelAdd: boolean
    loading: boolean
    data: IModel[] | []
    error: string | null
}

const initialState: IInitialState = {
    isModelAdd: false,
    loading: false,
    data: [],
    error: null
};

export const models = (state = initialState, action: AnyAction) => {
    switch (action.type){
        case types.GET_MODELS_REQUEST:
            return {
                ...state,
                loading: true,
                data: [],
                error: null
            }
        case types.GET_MODELS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        case types.GET_MODELS_FAILURE:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        case types.ADD_MODEL_REQUEST:
            return {
                ...state,
                loading: true,
                isModelAdd: false,
                error: null
            }
        case types.ADD_MODEL_SUCCESS:
            return {
                ...state,
                loading: false,
                isModelAdd: true,
                error: null
            }
        case types.ADD_MODEL_FAILURE:
            return {
                ...state,
                loading: false,
                isModelAdd: false,
                error: action.payload
            }
        default: return state
    }
}