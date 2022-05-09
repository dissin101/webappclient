import {Dispatch} from "redux";
import {checkService, loginService, registrationService} from "../../services/auth";
import {ILogin, IRegistration} from "../../models/auth";
import {AxiosError} from "axios";
import * as types from "../constants/auth";

export const loginUser = (data: ILogin) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.LOGIN_USER_REQUEST});
        loginService(data)
            .then(({data}) => {
                dispatch({type: types.LOGIN_USER_SUCCESS, payload: data.token});
            })
            .catch((error: AxiosError) => {
                dispatch({
                    type: types.LOGIN_USER_FAILURE,
                    payload: error.response ? error.response.data.message : "Ошибка"});
            })
    }
}

export const registrationUser = (data: IRegistration) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.REGISTRATION_USER_REQUEST})
        registrationService(data)
            .then(({data}) => {
                dispatch({type: types.REGISTRATION_USER_SUCCESS, payload: data.token})
            })
            .catch((error: AxiosError) => {
                dispatch({
                    type: types.REGISTRATION_USER_FAILURE,
                    payload: error.response ? error.response.data.message : "Ошибка"});
            })
    }
}

export const checkUser = (data: string) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.CHECK_USER_REQUEST});
        checkService(data)
            .then(({data}) => {
                dispatch({type: types.CHECK_USER_SUCCESS, payload: data.token});
            })
            .catch((error: AxiosError) => {
                dispatch({type: types.CHECK_USER_FAILURE});
            })
    }
}