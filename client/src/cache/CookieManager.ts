import Cookie from "js-cookie"

export function getJWT() {
    return Cookie.get(process.env.REACT_APP_JWT_KEY!)
}
export function getRefreshToken() {
    return Cookie.get(process.env.REACT_APP_REFRESH_TOKEN_KEY!)
}

export function AuthOn(token: string, refreshToken: string) {
    Cookie.set(process.env.REACT_APP_JWT_KEY!, token)
    Cookie.set(process.env.REACT_APP_REFRESH_TOKEN_KEY!, refreshToken)
}

export function AuthOff() {
    Cookie.remove(process.env.REACT_APP_REFRESH_TOKEN_KEY!)
    Cookie.remove(process.env.REACT_APP_JWT_KEY!)
}
