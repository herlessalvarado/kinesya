import validator from "validator"
import UserDTO, { UserCreateDTO } from "../DTO/UserDTO";


export default abstract class UserValidator { 
    protected  readonly errors:string[];

    constructor() {
        this.errors = []
    }

    abstract validate():void;

    getErrors(){return this.errors;}
    hasErrors(){return this.errors.length>0}

}

export class UserCreateValidator extends UserValidator{

    private readonly userBlacklist:string[];
    private readonly user:UserCreateDTO;

    validate(): void {
        this.validateEmail();
        this.validateUsername();

    }
    constructor(user:UserCreateDTO,userBlacklist:string[]){
        super();
        this.user= user;
        this.userBlacklist = userBlacklist;
    }

    validateEmail(){
        if (!validator.isEmail(this.user.email))
            this.errors.push("Invalid Email")
    }

    validateUsername(){
        if(this.userBlacklist.indexOf(this.user.username)> 0)
            this.errors.push("Invalid Username")
    }
}

export class UserUpdateValidator extends UserValidator{

    private readonly tagWhitelist:string[];
    private readonly user:UserDTO;

    constructor(user:UserDTO,tagWhitelist:string[]){
        super();
        this.user = user;
        this.tagWhitelist = tagWhitelist;
    }

    validate(): void {
       this.validateAge();
       this.validateTags();
       this.validatePhone();
       this.validateLocation();
       this.validatePrice();
    }

    
    validateAge(){
        if (!validator.isNumeric(this.user.age)){
            this.errors.push("Invalid Age")
        }
    } 
    validateTags(){
        if (this.user.tags.some(v => this.tagWhitelist.indexOf(v) < 0))
            this.errors.push("Invalid Tags")
    }
    validatePhone(){
        if(!validator.isMobilePhone(this.user.phone))
            this.errors.push("Invalid Phone Number")
    }
    validateLocation(){
        if(this.user.location.length < 0)
            this.errors.push("Invalid Location")
    }

    validatePrice(){
        if(!validator.isInt(this.user.price,{min:50}))
            this.errors.push("Invalid Price")
    }
}

