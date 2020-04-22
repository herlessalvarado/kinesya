export class ServiceResult {
    success: boolean
    private _errors: Array<Error>
    data: any
    constructor() {
        this.success = true
        this._errors = []
    }
    addError(error: Error) {
        this.success = false
        this._errors.push(error)
    }
    addData(data: any) {
        this.data = data
    }
    getErrorMessages() {
        return {
            message: this._errors.map((error) => error.message),
        }
    }
}
