import callApi from "../utils/callApi";

export const getModelsService = (id: number | null) => {
    return callApi({url: `http://localhost:7000/api/model${id ? `/${id}` : ``}`, method: "GET"})
}