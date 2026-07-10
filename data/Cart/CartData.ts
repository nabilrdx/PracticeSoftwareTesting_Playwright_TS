import { BillingDetails } from "../../interfaces/checkout/BillingDetails";
import { CartProductDetails } from "../../interfaces/Product/CartProductDetails";
import { PaymentTypes } from "../../interfaces/checkout/PaymentTypes";
import { existingTerm } from "../../interfaces/Product/SearchTerms";




export const CartData = {
    expected: {
        atcProductName: "Claw Hammer with Shock Reduction Grip ",
        atcProductQuantity: "1"
    } satisfies CartProductDetails,

    billingDetails: {
        country: "AL",
        postalCode: "1094",
        houseNo: "112"
    } satisfies BillingDetails,

    paymentMode: {
        cashOnDelivery: "cash-on-delivery",
        cc: "credit-card",
        bank: "bank-transfer",
        bynowpaylater: "buy-now-pay-later",
        gc: "gift-card",
    } satisfies PaymentTypes,
    
    product:{
        name: 'Hammer' satisfies existingTerm,
        qty: 3
    }


}