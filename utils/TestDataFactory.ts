import { RegistrationPayload } from "../interfaces/registrationPayload";
import data from "../data/data.json" 


// type categoryOfPLP= ' Hammer ' | ' Saw ';
export class TestDataFactory{
    constructor(){

    }

    getRegistrationData(overrides: Partial<RegistrationPayload> = {}):RegistrationPayload{
        return {
            ...data.registration.newUserData,
            email: `${Date.now()}-qa@yopmail.com`,
            ...overrides
        }
    }

    

    // getPlpCategory(category: categoryOfPLP){
    //     return data.plpData.categories.find((e)=> e == category)!;
    // }
    

}