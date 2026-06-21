import { CreateOrderBank, CreateOrderByNowPayLater, CreateOrderCC, CreateOrderCOD, CreateOrderGC, CreateOrderPayloadBase } from "../../interfaces/checkout/CreateOrderPayload";

export const CreateOrderDataCod = {
    billing_street: "Schimmel Avenue",
    billing_city: "Lake Rubieview",
    billing_state: "Minnesota",
    billing_country: "US",
    billing_postal_code: "90001",
    payment_method: "cash-on-delivery",
    payment_details: {}
} satisfies CreateOrderCOD;

export const CreateOrderDataGiftCard = {
    billing_street: "Schimmel Avenue",
    billing_city: "Lake Rubieview",
    billing_state: "Minnesota",
    billing_country: "US",
    billing_postal_code: "90001",
    payment_method: "gift-card",
    payment_details: {

        gift_card_number: "giftcard12345678",
        validation_code: "1234"
    }

} satisfies CreateOrderGC;

export const CreateOrderDataBankTransfer = {
    billing_street: "Schimmel Avenue",
    billing_city: "Lake Rubieview",
    billing_state: "Minnesota",
    billing_country: "US",
    billing_postal_code: "90001",
    payment_method: "bank-transfer",
    payment_details: {
        account_name: "Joes",
        account_number: "8976434088",
        bank_name: "Alexa"

    }
} satisfies CreateOrderBank;

export const CreateOrderDataBuyNow = {
    billing_street: "Schimmel Avenue",
    billing_city: "Lake Rubieview",
    billing_state: "Minnesota",
    billing_country: "US",
    billing_postal_code: "90001",
    payment_method: "buy-now-pay-later",
    payment_details: {
        monthly_installments: "3"
    }
} satisfies CreateOrderByNowPayLater;

export const CreateOrderDataCreditCard = {
    billing_street: "Schimmel Avenue",
    billing_city: "Lake Rubieview",
    billing_state: "Minnesota",
    billing_country: "US",
    billing_postal_code: "90001",
    payment_method: "credit-card",
    payment_details: {
        card_holder_name: "Nabil Ansari",
        credit_card_number: "5454-5454-5454-5454",
        cvv: "111",
        expiration_date: "12/2030"
    }
} satisfies CreateOrderCC;
