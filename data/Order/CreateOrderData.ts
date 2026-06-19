import { CreateOrderPayload } from "../../interfaces/CreateOrderPayload";

export const CreateOrderData = {
    billing_street: "Schimmel Avenue",
    billing_city: "Lake Rubieview",
    billing_state: "Minnesota",
    billing_country: "US",
    billing_postal_code: "90001",
    payment_method: "cash-on-delivery",
    payment_details: {}
} satisfies CreateOrderPayload