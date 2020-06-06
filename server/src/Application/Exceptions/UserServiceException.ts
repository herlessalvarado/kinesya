export default class UserServiceException extends Error {
    constructor(errors: string[]) {
        super(errors.join(","))
        Object.setPrototypeOf(this, UserServiceException.prototype)
    }
}

export class PasswordException extends Error {
    constructor() {
        super("Password no coincide")
        Object.setPrototypeOf(this, UserServiceException.prototype)
    }
}