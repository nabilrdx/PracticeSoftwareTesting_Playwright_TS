import { PaymentTypes } from "./PaymentTypes";

export interface CreateOrderPayload{
    billing_street: string;
    billing_city: string;
    billing_state: string;
    billing_country: string;
    billing_postal_code: string;
    payment_method: PaymentTypes[keyof PaymentTypes];
    payment_details: {}
}