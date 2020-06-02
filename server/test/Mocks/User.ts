import User from "../../src/Data/Entities/User";
import UserDTO, { UserCreateDTO } from "../../src/Application/DTO/UserDTO";

export const usersDB: User[] = [
    {
        id: "1",
        username: "Pamela",
        password: "123",
        email: "Pamela@gmail.com",
        isPublic: true
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
    {
        id: "4",
        username: "Alejandra",
        password: "123",
        email: "Alejandra@gmail.com",
        isPublic: true
    },
    {
        id: "5",
        username: "Elizabeth",
        password: "123",
        email: "Elizabeth@gmail.com",
        isPublic: true
    },

];

export const usersDTO:UserDTO[] =[
    {
        username: "Luciana",
        email: "Luciana@gmail.com",
    },
    {
        username: "Alejandra",
        email: "Alejandra@gmail.com",
    },
    {
        username: "Elizabeth",
        email: "Elizabeth@gmail.com",
    },
]
export const BadUserCreateDTO:UserCreateDTO = {
    email: "Pamela@gmail.com",
    username: "Luciana",
    password: "123qwe4r"
}
export const GoodUserCreateDTO:UserCreateDTO = {
    email: "pamel123@gmail.com",
    username: "Fabiolita",
    password: "123qwe4r"
}