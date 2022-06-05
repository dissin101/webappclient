import callApi from "../utils/callApi";

export const getCategoriesService = () => {
    return callApi({url: 'https://car-part.herokuapp.com/api/category', method: "GET"})
}