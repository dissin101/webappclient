import { Dispatch } from "redux";
import {addBrandService, getBrandsService} from "../../services/brands";
import * as types from "../constants/brands";
import {AxiosError} from "axios";
import {FormikValues} from "formik";

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

export const addBrand = (props: FormikValues) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.ADD_BRAND_REQUEST});
        addBrandService(props)
            .then(() => {
                dispatch({type: types.ADD_BRAND_SUCCESS});
            })
            .catch((error: AxiosError) => {
                dispatch({type: types.ADD_BRAND_FAILURE, payload: error.response ? error.response.data.message : "Ошибка"})
            })
    }
}