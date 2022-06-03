import * as types from "../constants/auth";
import {AnyAction} from "redux";
import {removeUserToken, writeUserToken} from "../../utils/helpers";
import {IUser} from "../../models/auth";

interface IInitialState {
    loading: boolean
    isAuth: boolean
    data: IUser | null
    error: string | null
}

const initialState: IInitialState = {
    loading: false,
    isAuth: false,
    data: null,
    error: null
}

export const auth = (state = initialState, action: AnyAction) => {
    switch (action.type){
        case types.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuth: false,
                error: null
            }
        case types.LOGIN_USER_SUCCESS:
            writeUserToken(action.payload.token);
            return {
                ...state,
                loading: false,
                isAuth: true,
                error: null,
                data: action.payload.data
            }
        case types.LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                isAuth: false,
                error: action.payload
            }
        case types.REGISTRATION_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuth: false,
                error: null
            }
        case types.REGISTRATION_USER_SUCCESS:
            writeUserToken(action.payload.token);
            return {
                ...state,
                loading: false,
                isAuth: true,
                error: null,
                data: action.payload.data
            }
        case types.REGISTRATION_USER_FAILURE:
            return {
                ...state,
                loading: false,
                isAuth: false,
                error: action.payload
            }
        case types.CHECK_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuth: false,
                error: null
            }
        case types.CHECK_USER_SUCCESS:
            writeUserToken(action.payload.token);
            return {
                ...state,
                loading: false,
                isAuth: true,
                error: null,
                data: action.payload.data
            }
        case types.CHECK_USER_FAILURE:
            removeUserToken();
            return {
                ...state,
                loading: false,
                isAuth: false,
                error: action.payload
            }
        default: return state
    }
}