import {Dispatch} from "redux";
import * as types from "../constants/models";
import {AxiosError} from "axios";
import {addModelService, getModelsService} from "../../services/models";
import {IProfileModelAddForm} from "../../components/pages/Profile/ProfileProductAdd/ProfileModelAddModal/interface";

export const getModels = (id: number | null) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.GET_MODELS_REQUEST});
        getModelsService(id)
            .then(({data}) => {
                dispatch({type: types.GET_MODELS_SUCCESS, payload: data})
            })
            .catch((error: AxiosError) => {
                dispatch({type: types.GET_MODELS_FAILURE, payload: error.response ? error.response.data.message : "Ошибка"})
            })
    }
};

export const addModel = (form: IProfileModelAddForm) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.ADD_MODEL_REQUEST});
        addModelService(form)
            .then(() => {
                dispatch({type: types.ADD_MODEL_SUCCESS});
            })
            .catch((error: AxiosError) => {
                dispatch({type: types.ADD_MODEL_FAILURE, payload: error.response ? error.response.data.message : "Ошибка"})
            })
    }
};