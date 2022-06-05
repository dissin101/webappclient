import callApi from "../utils/callApi";
import {ILogin, IRegistration} from "../models/auth";

export const loginService = (data: ILogin) => {
    return callApi({url:  'https://car-part.herokuapp.com/api/user/login', method: "POST", data})
}

export const registrationService = (data: IRegistration) => {
    return callApi({url:  'https://car-part.herokuapp.com/api/user/registration', method: "POST", data})
}

export const checkService = (header: string) => {
    const headers = {
        "Authorization": "Bearer " + header
    };

    return callApi({url: 'https://car-part.herokuapp.com/api/user/auth', method: "GET", headers})
}