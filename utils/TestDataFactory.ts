import { RegistrationForm } from "../interfaces/user/RegistrationForm";
import { RegisterUser } from "../interfaces/user/RegisterUser";
import { UserData } from "../data/User/UserData";
import { RegistrationPageData } from "../data/User/RegistrationPageData";
import { CreateOrderPayload, CreateOrderPayloadBase,  PaymentDetails } from "../interfaces/checkout/CreateOrderPayload";
import { PaymentTypes } from "../interfaces/checkout/PaymentTypes";
import { CreateOrderDataBankTransfer, CreateOrderDataBuyNow, CreateOrderDataCod, CreateOrderDataCreditCard, CreateOrderDataGiftCard } from "../data/Order/CreateOrderData";



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

    getOrderDetails(orderDetails: Partial<CreateOrderPayload>={}): CreateOrderPayload{
        switch(orderDetails.payment_method){
            case "bank-transfer":
                return {
                    ...CreateOrderDataBankTransfer,
                    ...orderDetails
                }

            case "buy-now-pay-later":
                return {
                    ...CreateOrderDataBuyNow,
                    ...orderDetails
                }
            
            case "gift-card":
                return {
                    ...CreateOrderDataGiftCard,
                    ...orderDetails
                }
            
            case "credit-card":
                return {
                    ...CreateOrderDataCreditCard,
                    ...orderDetails
                }

            case "cash-on-delivery":
            default:
                return {
                    ...CreateOrderDataCod,
                    ...orderDetails
                } as CreateOrderPayload;
        }
    }

    // getPlpCategory(category: categoryOfPLP){
    //     return data.plpData.categories.find((e)=> e == category)!;
    // }
    

}

