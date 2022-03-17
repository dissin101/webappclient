import {Dispatch} from "redux";
import * as types from "../constants/models";
import {AxiosError} from "axios";
import {getModelsService} from "../../services/models";


export const getModels = (id: number | null) => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.GET_MODELS_REQUEST});
        getModelsService(id)
            .then(({data}) => {
                dispatch({type: types.GET_MODELS_SUCCESS, payload: data})
            })
            .catch((error: AxiosError) => {
                dispatch({type: types.GET_MODELS_ERROR, payload: error.response ? error.response.data.message : "Ошибка"})
            })
    }
}