import { RegistrationForm } from "../interfaces/user/RegistrationForm";
import { RegisterUser } from "../interfaces/user/RegisterUser";
import { UserData } from "../data/User/UserData";
import { RegistrationPageData } from "../data/User/RegistrationPageData";


// type categoryOfPLP= ' Hammer ' | ' Saw ';
export class TestDataFactory{
    constructor(){

    }

    getRegistrationData(overrides: Partial<RegistrationForm> = {}):RegistrationForm{
        return {
            ...RegistrationPageData.formData,
            email: `${Date.now()}-qa@yopmail.com`,
            ...overrides
        }
    }

    getNewUserDetails(overrides: Partial<RegisterUser>={}):RegisterUser{
        return {
            ...UserData.registerUser,
            email: `${Date.now()}-qa@yopmail.com`,
            ...overrides
        }
    }

    

    // getPlpCategory(category: categoryOfPLP){
    //     return data.plpData.categories.find((e)=> e == category)!;
    // }
    

}