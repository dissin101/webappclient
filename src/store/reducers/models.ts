import * as types from "../constants/models";
import {AnyAction} from "redux";
import {IModel} from "../../models/model";

interface IInitialState {
    loading: boolean
    data: IModel | null
    error: string | null
}

const initialState: IInitialState = {
    loading: false,
    data: null,
    error: null
};

export const models = (state = initialState, action: AnyAction) => {
    switch (action.type){
        case types.GET_MODELS_REQUEST:
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        case types.GET_MODELS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        case types.GET_MODELS_ERROR:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        default: return state
    }
}