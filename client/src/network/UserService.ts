import axios from 'axios'
import headers, { handlerLogOutError } from './axiosConfig'
import { getRefreshToken, AuthOn } from '../cache/cookies/cookieManager'

export const getNewToken = () => {
    return axios
        .post("/users/token", { refreshToken: getRefreshToken() })
        .then((result) => {
            AuthOn(result.data.token, result.data.refreshToken)
            return result
        })
        .catch(handlerLogOutError)
}

export const _getUserByToken = () => {
    return axios.get("users/me", headers()).then((response) => {
        return response.data
    })
}

export async function getUsers() {
    const res = await axios.get("/users")
    return res.data
}

export async function getUserByUsername(username: string) {
    return axios.get("/users/" + username).then((response) => {
        return response.data
    })
}

export async function logInUser(email: string, password: string) {
    return axios.post("/users/login", { email, password }).then((result) => {
        AuthOn(result.data.token, result.data.refreshToken)
        return result.data
    })
}

export async function signUp(username: string, email: string, password: string): Promise<string> {
    return axios.post("/users", { username, email, password }).then((result) => {
        AuthOn(result.data.token, result.data.refreshToken)
        return result.data
    })
}

export async function _updateUser(formData: any) {
    return axios.put("/users", formData, headers()).then((res) => res.data)
}
export async function updateUser(formData: any) {
    return _updateUser(formData).catch(() => getNewToken().then(() => _updateUser(formData)))
}

export async function getUserByToken() {
    return _getUserByToken().catch(() => getNewToken().then(() => _getUserByToken()))
}

export async function getUsersByDistrict(district: string): Promise<any> {
    return axios
        .get("/users", {
            params: {
                location: district,
            },
        })
        .then((response) => {
            return response.data
        })
}

export async function getUsersByFilter(eyes: string, hair: string, birthPlace: string, orientation: string, ethnicity: string, lowerPrice: string, upperPrice: string, tags: string[]): Promise<any> {
    var params = new URLSearchParams();
    for (let i of tags) {
        params.append("services", i);   
    }
    params.append("eyes", eyes);
    params.append("hair", hair);
    params.append("birthPlace", birthPlace);
    params.append("sexualOrientation", orientation);
    params.append("ethnicity", ethnicity);
    params.append("lowerPrice", lowerPrice);
    params.append("upperPrice", upperPrice);
    return axios
        .get("/users", {
            params: params
        })
        .then((response) => {
            return response.data
        })
}

export async function getUsersByPaginator(page: Number, limit: Number) {
    return axios
        .get("/users", {
            params: {
                page: page,
                limit: limit,
            },
        })
        .then((response) => {
            return response.data
        })
}
