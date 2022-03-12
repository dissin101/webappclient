import callApi from "../utils/callApi";

export const getBrandsService = () => {
    return callApi({url: 'http://localhost:7000/api/brand', method: "GET"})
}