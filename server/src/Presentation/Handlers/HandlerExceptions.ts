import UserServiceException, {
    PasswordException,
    TokenExpiredException,
} from "../../Application/Exceptions/UserServiceException"
import { HttpResponse } from "../Controllers/UserController"
import {
    BAD_REQUEST,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    getStatusText,
    UNAUTHORIZED,
} from "http-status-codes"
import UserNotFoundException from "../../Data/Exceptions/RepositoryException"
import UserPresentationException from "../Exceptions/UserPresentationException"

export function handlerExceptions(error: Error, resp: HttpResponse) {
    switch (error.constructor) {
        case UserServiceException:
            resp.status = BAD_REQUEST
            resp.body = error.message
            break
        case UserNotFoundException:
            resp.status = NOT_FOUND
            resp.body = error.message
            break
        case UserPresentationException:
            resp.status = BAD_REQUEST
            resp.body = error.message
            break
        case PasswordException:
            resp.status = UNAUTHORIZED
            resp.body = error.message
            break
        case TokenExpiredException:
            resp.status = UNAUTHORIZED
            resp.body = error.message
            break
        default:
            resp.status = INTERNAL_SERVER_ERROR
            resp.body = getStatusText(INTERNAL_SERVER_ERROR)
            break
    }
}
