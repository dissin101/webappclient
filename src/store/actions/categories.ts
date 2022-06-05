import {Dispatch} from "redux";
import * as types from "../constants/categories";
import {AxiosError} from "axios";
import {addCategoryService, getCategoriesService} from "../../services/categories";
import {IProfileCategoryAddForm} from "../../components/pages/Profile/ProfileProductAdd/ProfileCategoryAddModal/interface";

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

export const addCategory = (form: IProfileCategoryAddForm) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.ADD_CATEGORY_REQUEST});
        addCategoryService(form)
            .then(() => {
                dispatch({type: types.ADD_CATEGORY_SUCCESS});
            })
            .catch((error: AxiosError) => {
                dispatch({type: types.ADD_CATEGORY_FAILURE, payload: error.response ? error.response.data.message : "Ошибка"})
            })
    }
};