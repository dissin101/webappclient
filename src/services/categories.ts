import callApi from "../utils/callApi";
import {IProfileModelAddForm} from "../components/pages/Profile/ProfileProductAdd/ProfileModelAddModal/interface";
import {getUserToken} from "../utils/helpers";
import {IProfileCategoryAddForm} from "../components/pages/Profile/ProfileProductAdd/ProfileCategoryAddModal/interface";

export const getCategoriesService = () => {
    return callApi({url: 'https://car-part.herokuapp.com/api/category', method: "GET"})
}

export const addCategoryService = (form: IProfileCategoryAddForm) => {
    const token = getUserToken();

    return callApi({
        url: `https://car-part.herokuapp.com/api/category`,
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        data: form
    })
}