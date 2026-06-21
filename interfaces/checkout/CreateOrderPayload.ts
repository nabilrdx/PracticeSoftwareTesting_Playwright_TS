import { PaymentTypes } from "./PaymentTypes";

export interface CreateOrderPayloadBase {
    billing_street: string;
    billing_city: string;
    billing_state: string;
    billing_country: string;
    billing_postal_code: string;
}

type EmptyObject = Record<string, never>;

export interface PaymentDetailsCreditCard{
card_holder_name: string;
credit_card_number: string;
cvv: string;
expiration_date: string;
}

export interface PaymentDetailsCod{

}

export interface PaymentDetailsGc{
    gift_card_number: string;
    validation_code: string;
}

export interface PaymentDetailsBNPL{
    monthly_installments: string;
}

export interface PaymentDetailsBankTrans{
    account_name: string;
    account_number: string;
    bank_name: string;
}

export type PaymentDetails = PaymentDetailsBNPL| PaymentDetailsBankTrans | PaymentDetailsCod | PaymentDetailsCreditCard | PaymentDetailsGc;




export interface CreateOrderCOD extends CreateOrderPayloadBase {
    payment_method: 'cash-on-delivery';
    payment_details: EmptyObject
}

export interface CreateOrderCC extends CreateOrderPayloadBase {
    payment_method: 'credit-card';
    payment_details: PaymentDetailsCreditCard
}

export interface CreateOrderBank extends CreateOrderPayloadBase {
    payment_method: 'bank-transfer';
    payment_details: PaymentDetailsBankTrans
}

export interface CreateOrderByNowPayLater extends CreateOrderPayloadBase {
    payment_method: 'buy-now-pay-later';
    payment_details: PaymentDetailsBNPL
}

export interface CreateOrderGC extends CreateOrderPayloadBase {
    payment_method: 'gift-card';
    payment_details: PaymentDetailsGc
}

export type CreateOrderPayload = CreateOrderCOD | CreateOrderBank | CreateOrderCC | CreateOrderGC | CreateOrderByNowPayLater;




// bank-transfer
// buy-now-pay-later
// gift-card


