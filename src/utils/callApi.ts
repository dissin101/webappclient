import axios from "axios";

interface callApiInterface {
    url: string
    method: 'GET' | 'POST'
    data?: any
}

const callApi = ({url, method, data}: callApiInterface) => {
    return axios({
        url,
        headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        },
        data,
        method,
    })
}

export default callApi;