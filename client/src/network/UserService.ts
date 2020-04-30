import axios from "axios"
import headers, { handlerLogOutError } from "./axiosConfig"
import { getRefreshToken, AuthOn } from "../cache/CookieManager"

export const getNewToken = () => {
    return axios
        .post("/users/token", { refresh_token: getRefreshToken() })
        .then((result) => {
            AuthOn(result.data.token, result.data.refresh_token)
            return result
        })
        .catch(handlerLogOutError)
}

export const _getUserByToken = () => {
    return axios.get("/users/me", headers()).then((response) => {
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
        AuthOn(result.data.token, result.data.refresh_token)
        return result.data
    })
}

export async function signUp(username: string, email: string, password: string): Promise<string> {
    return axios.post("/users", { username, email, password }).then((result) => {
        AuthOn(result.data.token, result.data.refresh_token)
        return result.data
    })
}

export async function _updateUser(formData: any) {
    return axios.put("/users", formData, headers()).then((res) => res.data.message)
}
export async function updateUser(formData: any) {
    return _updateUser(formData).catch(() => getNewToken().then(() => _updateUser(formData)))
}

export async function getUserByToken() {
    return _getUserByToken().catch(() => getNewToken().then(() => _getUserByToken()))
}
