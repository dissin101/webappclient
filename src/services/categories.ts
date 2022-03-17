import callApi from "../utils/callApi";

export const getCategoriesService = () => {
    return callApi({url: 'http://localhost:7000/api/category', method: "GET"})
}