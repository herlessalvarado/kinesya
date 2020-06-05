export default class UserNotFoundException extends Error {
    constructor() {
        super("This user doesnt exists")
        Object.setPrototypeOf(this, UserNotFoundException.prototype)
    }
}
