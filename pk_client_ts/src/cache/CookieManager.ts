import Cookie from 'js-cookie'

export function checkAuth(){
    return Cookie.get(process.env.REACT_APP_USER_CACHE!)
}
export function AuthOn(){
    Cookie.set(process.env.REACT_APP_USER_CACHE!,process.env.REACT_APP_USER_VALUE!)
}
export function AuthOff(){
    Cookie.remove(process.env.REACT_APP_USER_CACHE!)
}
