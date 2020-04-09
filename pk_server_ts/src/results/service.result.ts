export class ServiceResult{
    success: boolean;
    errors: Array<Error>;
    data: any;
    constructor(){
        this.success = true;
        this.errors = [];
    }
    addError(error: Error){
        this.success = false;
        this.errors.push(error);
    }
    addData(data: any){
        this.data = data;
    }
}