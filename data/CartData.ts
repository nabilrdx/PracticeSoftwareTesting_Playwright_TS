import { BillingDetails, CartProductDetails, PaymentTypes } from "../interfaces/CartModel";

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
        cashOnDelivery: "cash-on-delivery"
    } satisfies PaymentTypes
}