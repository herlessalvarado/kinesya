import {User} from "../../src/Data/Entities/User";
import UserDTO, { UserCreateDTO, UserLoginDTO } from "../../src/Application/DTO/UserDTO";

export const usersDB: User[] = [
    new User().setId("1")
    .setPassword("123")
    .setEmail("Pamela@gmail.com")
    .setPublic(true)
    .setLocation("Chorrillos")
    .setUsername("Pamela"),
    new User().setId("2")
    .setPassword("123")
    .setEmail("Fabiola@gmail.com")
    .setPublic(false)
    .setLocation("Chorrillos")
    .setUsername("Fabiola"),
    new User().setId("3")
    .setPassword("123")
    .setEmail("Luciana@gmail.com")
    .setPublic(false)
    .setLocation("Chorrillos")
    .setUsername("Luciana"),
    new User().setId("4")
    .setPassword("123")
    .setEmail("Alejandra@gmail.com")
    .setPublic(true)
    .setLocation("Chorrillos")
    .setUsername("Alejandra"),
    new User().setId("5")
    .setPassword("123")
    .setEmail("Elizabeth@gmail.com")
    .setPublic(true)
    .setLocation("Chorrillos")
    .setUsername("Elizabeth")
];

export const MockUserEntity = new User().setId("1").setRefreshToken("refresh Token")
.setPassword("1234")
.setEmail("Pamela@gmail.com")
.setPublic(true)
.setUsername("Pamela")

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

export const GoodUserLoginDTO: UserLoginDTO = {
    email: "Pamela@gmail.com",
    password: "123"
}

export const BadUserLoginDTO: UserLoginDTO = {
    email: "Pamela@gmail.com",
    password: "1234qwer"
}