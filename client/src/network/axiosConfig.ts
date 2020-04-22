import { getJWT, AuthOff } from "../cache/CookieManager"
import { AxiosError } from "axios"

export default () => ({ headers: { Authorization: `Bearer ${getJWT()}` } })
export function handlerLogOutError(err: AxiosError) {
    AuthOff()
    return err
}
export function handlerAuthError() {}
