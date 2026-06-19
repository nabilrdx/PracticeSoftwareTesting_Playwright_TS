import { RegistrationForm } from "../interfaces/RegistrationForm";
import { RegisterUser } from "../interfaces/RegisterUser";
import { UserData } from "../data/UserData";
import { RegistrationPageData } from "../data/RegistrationPageData";


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