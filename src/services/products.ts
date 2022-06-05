import callApi from "../utils/callApi";
import {IProductSearchParams} from "../components/pages/Catalog/ProductsOutput/interface";
import {IProfileProductAddForm} from "../components/pages/Profile/ProfileProductAdd/interface";
import {getUserToken} from "../utils/helpers";

export const getProductsService = (body: IProductSearchParams, page = 1, count = 9) => {
    return callApi({url: `https://car-part.herokuapp.com/api/item?limit=${count}&page=${page}`, method: "POST", data: body})
}

export const getProductService = (id: number) => {
    return callApi({url: `https://car-part.herokuapp.com/api/item/${id}`, method: "GET"})
}

export const addProductService = (form: IProfileProductAddForm) => {
    const token = getUserToken();
    const bodyFormData = new FormData();
    bodyFormData.append('name', form.name);
    bodyFormData.append('img', form.img[0]);
    bodyFormData.append('price', form.price);
    bodyFormData.append('brandId', form.brandId);
    bodyFormData.append('categoryId', form.categoryId);
    bodyFormData.append('modelId', form.modelId);
    bodyFormData.append('description', form.description);


    return callApi({
        url: 'https://car-part.herokuapp.com/api/item/add',
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "multipart/form-data"
        },
        data: bodyFormData
    })
}