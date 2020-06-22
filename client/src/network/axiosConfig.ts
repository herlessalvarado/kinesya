import { getJWT, AuthOff } from '../cache/cookies/cookieManager'
import { AxiosError } from 'axios'

export default () => ({ headers: { Authorization: `Bearer ${getJWT()}` } })
export function handlerLogOutError(err: AxiosError) {
    AuthOff()
    return err
}
export function handlerAuthError() {}
