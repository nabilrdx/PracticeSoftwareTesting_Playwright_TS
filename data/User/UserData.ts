import { LoginUser } from "../../interfaces/user/LoginUser";
import { RegisterUser } from "../../interfaces/user/RegisterUser";

export const UserData = {
    validUser: {
        email: "customer2@practicesoftwaretesting.com",
        password: "welcome01"
    } satisfies LoginUser,
    invalidUser: {
        email: "johncena111@yopmail.com",
        password: "Password1"
    } satisfies LoginUser,
    registerUser: {
        fName: "Nabil",
        lName: "Ansari",
        password: "11992288@Nn",
        email:'',
        address: {
            street: "Rempel Manors",
            house_number: "112",
            city: "Lake Bobbiemouth",
            state: "California",
            country: "AL",
            postal_code: "421308"
        } 
    } satisfies RegisterUser
} 