import {Dispatch} from "redux";
import * as types from "../constants/products";
import {AxiosError} from "axios";
import {addProductService, getProductService, getProductsService} from "../../services/products";
import {IProductSearchParams} from "../../components/pages/Catalog/ProductsOutput/interface";
import {IProfileProductAddForm} from "../../components/pages/Profile/ProfileProductAdd/interface";
import {addCategoryService} from "../../services/categories";

export const getProducts = (params: IProductSearchParams, page?: number, count?: number) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.GET_PRODUCTS_REQUEST});
        getProductsService(params, page, count)
            .then(({data}) => {
                /*todo задиспатчить page*/
                dispatch({type: types.GET_PRODUCTS_SUCCESS, payload: data.rows})
            })
            .catch((error: AxiosError) => {
                dispatch({
                    type: types.GET_PRODUCTS_ERROR,
                    payload: error.response ? error.response.data.message : "Ошибка"
                })
            })
    }
}

export const getProduct = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.GET_PRODUCT_REQUEST});
        getProductService(id)
            .then(({data}) => {
                dispatch({type: types.GET_PRODUCT_SUCCESS, payload: data})
            })
            .catch((error: AxiosError) => {
                dispatch({
                    type: types.GET_PRODUCT_ERROR,
                    payload: error.response ? error.response.data.message : "Ошибка"
                })
            })
    }
}

export const addProduct = (form: IProfileProductAddForm) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.ADD_PRODUCT_REQUEST});
        addProductService(form)
            .then(() => {
                dispatch({type: types.ADD_PRODUCT_SUCCESS});
            })
            .catch((error: AxiosError) => {
                dispatch({
                    type: types.ADD_PRODUCT_FAILURE,
                    payload: error.response ? error.response.data.message : "Ошибка"
                })
            })
    }
}