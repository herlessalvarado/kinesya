import Cookie from "js-cookie"
import jwt from "jsonwebtoken"

export function getJWT() {
    return Cookie.get(process.env.REACT_APP_JWT_KEY!)
}
export function getRefreshToken() {
    return Cookie.get(process.env.REACT_APP_REFRESH_TOKEN_KEY!)
}

export function getUserName() {
    const payload = jwt.decode(getJWT()!) as { [key: string]: string }
    return payload.username
}
export function AuthOn(token: string, refreshToken: string) {
    Cookie.set(process.env.REACT_APP_JWT_KEY!, token)
    Cookie.set(process.env.REACT_APP_REFRESH_TOKEN_KEY!, refreshToken)
}

export function AuthOff() {
    Cookie.remove(process.env.REACT_APP_REFRESH_TOKEN_KEY!)
    Cookie.remove(process.env.REACT_APP_JWT_KEY!)
}
