import { LoginUser } from "../interfaces/LoginUser";

export const UserData = {
    validUser: {
        email: "customer2@practicesoftwaretesting.com",
        password: "welcome01"
    } satisfies LoginUser,
    invalidUser: {
        email: "johncena111@yopmail.com",
        password: "Password1"
    }satisfies LoginUser,
} 