import User from "../../../src/Data/Entities/User";
import { UserCreateDTO } from "../../../src/Application/DTO/UserDTO";

export const usersDB: User[] = [
    {
        id: "1",
        username: "Pamela",
        password: "123",
        email: "Pamela@gmail.com",
        isPublic: false
    },
    {
        id: "2",
        username: "Fabiola",
        password: "123",
        email: "Fabiola@gmail.com",
        isPublic: false
    },
    {
        id: "3",
        username: "Luciana",
        password: "123",
        email: "Luciana@gmail.com",
        isPublic: false
    },

];
export const BadUserCreateDTO:UserCreateDTO = {
    email: "fakeEmail.com",
    username: "Luciana",
    password: "123qwe4r"
}
export const GoodUserCreateDTO:UserCreateDTO = {
    email: "pamel123@gmail.com",
    username: "Fabiolita",
    password: "123qwe4r"
}