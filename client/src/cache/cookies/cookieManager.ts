import Cookie from 'js-cookie'
import { UserViewModel, NullUser } from '../../models/user'

export function getJWT() {
    return Cookie.get(process.env.REACT_APP_JWT_KEY!)
}

export function setUser(user:UserViewModel){
    if (user.name.length === 0 )
        localStorage.setItem("user",JSON.stringify(NullUser))   
    else
        localStorage.setItem("user",JSON.stringify(user))
}

export function getUser():UserViewModel{
    return JSON.parse(localStorage.getItem("user")!) 
}

export function getRefreshToken() {
    return Cookie.get(process.env.REACT_APP_REFRESH_TOKEN_KEY!)
}


export function AuthOn(token: string, refreshToken: string) {
    Cookie.set(process.env.REACT_APP_JWT_KEY!, token)
    Cookie.set(process.env.REACT_APP_REFRESH_TOKEN_KEY!, refreshToken)
}

export function AuthOff() {
    localStorage.removeItem("user")
    Cookie.remove(process.env.REACT_APP_REFRESH_TOKEN_KEY!)
    Cookie.remove(process.env.REACT_APP_JWT_KEY!)
}
