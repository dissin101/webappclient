import {Dispatch} from "redux";
import {checkService, loginService, registrationService} from "../../services/auth";
import {ILogin, IRegistration, IUser} from "../../models/auth";
import {AxiosError} from "axios";
import * as types from "../constants/auth";
import jwtDecode from "jwt-decode";

export const loginUser = (data: ILogin) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.LOGIN_USER_REQUEST});
        loginService(data)
            .then(({data}) => {
                const result: IUser = jwtDecode(data.token);
                dispatch({
                    type: types.LOGIN_USER_SUCCESS, payload: {
                        token: data.token,
                        data: result
                    }
                });
            })
            .catch((error: AxiosError) => {
                dispatch({
                    type: types.LOGIN_USER_FAILURE,
                    payload: error.response ? error.response.data.message : "Ошибка"
                });
            })
    }
}

export const registrationUser = (data: IRegistration) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.REGISTRATION_USER_REQUEST})
        registrationService(data)
            .then(({data}) => {
                const result: IUser = jwtDecode(data.token);
                dispatch({
                    type: types.REGISTRATION_USER_SUCCESS, payload: {
                        token: data.token,
                        data: result
                    }
                });
            })
            .catch((error: AxiosError) => {
                dispatch({
                    type: types.REGISTRATION_USER_FAILURE,
                    payload: error.response ? error.response.data.message : "Ошибка"
                });
            })
    }
}

export const checkUser = (data: string) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.CHECK_USER_REQUEST});
        checkService(data)
            .then(({data}) => {
                const result: IUser = jwtDecode(data.token);
                dispatch({
                    type: types.CHECK_USER_SUCCESS, payload: {
                        token: data.token,
                        data: result
                    }
                });
            })
            .catch((error: AxiosError) => {
                dispatch({type: types.CHECK_USER_FAILURE});
            })
    }
}