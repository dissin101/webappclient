import callApi from "../utils/callApi";
import {ILogin, IRegistration} from "../models/auth";

export const loginService = (data: ILogin) => {
    return callApi({url:  'http://localhost:7000/api/user/login', method: "POST", data})
}

export const registrationService = (data: IRegistration) => {
    return callApi({url:  'http://localhost:7000/api/user/registration', method: "POST", data})
}

export const checkService = (header: string) => {
    const headers = {
        "Authorization": "Bearer " + header
    };

    return callApi({url: 'http://localhost:7000/api/user/auth', method: "GET", headers})
}