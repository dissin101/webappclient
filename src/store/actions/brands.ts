import { Dispatch } from "redux";
import {getBrandsService} from "../../services/brands";
import * as types from "../constants/brands";
import {AxiosError} from "axios";

export const getBrands = () => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.GET_BRANDS_REQUEST});
        getBrandsService()
            .then(({data}) => {
                dispatch({type: types.GET_BRANDS_SUCCESS, payload: data})
            })
            .catch((error: AxiosError) => {
                dispatch({type: types.GET_BRANDS_FAILURE, payload: error.response ? error.response.data.message : "Ошибка"})
            })
    }
}