import callApi from "../utils/callApi";
import {getUserToken} from "../utils/helpers";
import {IProfileModelAddForm} from "../components/pages/Profile/ProfileProductAdd/ProfileModelAddModal/interface";

export const getModelsService = (id: number | null) => {
    return callApi({url: `https://car-part.herokuapp.com/api/model${id ? `/${id}` : ``}`, method: "GET"})
}

export const addModelService = (form: IProfileModelAddForm) => {
    const token = getUserToken();


    return callApi({
        url: `https://car-part.herokuapp.com/api/model`,
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        data: form
    })
}