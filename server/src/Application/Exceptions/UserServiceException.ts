export default class UserServiceException extends Error {
    constructor(errors: string[]) {
        super(errors.join(","))
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class PasswordException extends Error {
    constructor() {
        super("Password no coincide")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class TokenExpiredException extends Error {
    constructor() {
        super("RefreshToken has been expired")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}
