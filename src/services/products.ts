import callApi from "../utils/callApi";
import {IProductSearchParams} from "../components/pages/Catalog/interface";

export const getProductsService = (body: IProductSearchParams, page = 1, count = 9) => {
    return callApi({url: `http://localhost:7000/api/item?limit=${count}&page=${page}`, method: "POST", data: body})
}