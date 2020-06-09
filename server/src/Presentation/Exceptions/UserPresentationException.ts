export default class UserPresentationException extends Error {
    constructor(errors: string[]) {
        super(errors.join(","))
        Object.setPrototypeOf(this, UserPresentationException.prototype)
    }
}
