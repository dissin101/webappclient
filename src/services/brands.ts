import callApi from "../utils/callApi";
import {getUserToken} from "../utils/helpers";
import {FormikValues} from "formik";

export const getBrandsService = () => {
    return callApi({url: 'https://car-part.herokuapp.com/api/brand', method: "GET"})
}

export const addBrandService = (props: FormikValues) => {
    const token = getUserToken();
    const bodyFormData = new FormData();
    bodyFormData.append('name', props.name);
    bodyFormData.append('img', props.img[0]);

    return callApi({
        url: 'https://car-part.herokuapp.com/api/brand',
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "multipart/form-data"
        },
        data: bodyFormData
    })
}