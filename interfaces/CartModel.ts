export interface CartProductDetails{
    atcProductName: string;
    atcProductQuantity: string;
}

export interface BillingDetails {
    country: string,
    postalCode: string,
    houseNo: string
}

export interface PaymentTypes{
    cashOnDelivery: "cash-on-delivery"
}