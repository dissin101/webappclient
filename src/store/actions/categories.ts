import {Dispatch} from "redux";
import * as types from "../constants/categories";
import {AxiosError} from "axios";
import {getCategoriesService} from "../../services/categories";

export const getCategories = () => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.GET_CATEGORIES_REQUEST});
        getCategoriesService()
            .then(({data}) => {
                dispatch({type: types.GET_CATEGORIES_SUCCESS, payload: data})
            })
            .catch((error: AxiosError) => {
                dispatch({type: types.GET_CATEGORIES_FAILURE, payload: error.response ? error.response.data.message : "Ошибка"})
            })
    }
}