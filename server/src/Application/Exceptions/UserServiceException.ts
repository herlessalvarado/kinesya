export default class UserServiceException extends Error {
    constructor(errors: string[]) {
        super(errors.join(","))
        Object.setPrototypeOf(this, UserServiceException.prototype)
    }
}
