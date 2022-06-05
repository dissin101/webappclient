import callApi from "../utils/callApi";
import {IProductSearchParams} from "../components/pages/Catalog/ProductsOutput/interface";

export const getProductsService = (body: IProductSearchParams, page = 1, count = 9) => {
    return callApi({url: `https://car-part.herokuapp.com/api/item?limit=${count}&page=${page}`, method: "POST", data: body})
}

export const getProductService = (id: number) => {
    return callApi({url: `https://car-part.herokuapp.com/api/item/${id}`, method: "GET"})
}