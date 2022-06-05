import callApi from "../utils/callApi";

export const getModelsService = (id: number | null) => {
    return callApi({url: `https://car-part.herokuapp.com/api/model${id ? `/${id}` : ``}`, method: "GET"})
}