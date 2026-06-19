import { APIRequestContext, Page, request } from "@playwright/test";
import { RegisterUser, UserAddress } from "../interfaces/user/RegisterUser";
import { CreateOrderPayload } from "../interfaces/checkout/CreateOrderPayload";
import { LoginUser } from "../interfaces/user/LoginUser";


export class ApiHelper {
    apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async getProductId() {
        let productIdForUrl: string;
        // const apiContext = await request.newContext();
        const response = await this.apiContext.fetch(`${process.env.API_URL}/products/search?q=hammer`);
        const responseJson = await response.json();
        console.log(responseJson.data[0].id, 'ProductID');
        productIdForUrl = responseJson.data[0].id;
        return productIdForUrl;

    }

    async createCart() {

        // const apiContext = await request.newContext();
        const call = await this.apiContext.post(`${process.env.API_URL}/carts`)
        const callRespJson = await call.json();
        console.log(callRespJson.id);
        return callRespJson.id;


    }

    async createCartForLoggedInUser(authToken: string) {


        // const apiContext = await request.newContext();
        const call = await this.apiContext.post(`${process.env.API_URL}/carts`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        const callRespJson = await call.json();
        console.log(callRespJson.id);
        return callRespJson.id;



    }

    async addItemToCart(cartId: string) {
        const callAtcApi = await this.apiContext.post(`${process.env.API_URL}/carts/${cartId}`,
            {
                data: {
                    product_id: await this.getProductId(),
                    quantity: 1
                }
            }
        );
        const atcResp = await callAtcApi.json();
        console.log(atcResp);
    }

    async addItemToCartForLoginUser(cartId: string, authToken: string) {
        const callAtcApi = await this.apiContext.post(`${process.env.API_URL}/carts/${cartId}`,
            {
                data: {
                    product_id: await this.getProductId(),
                    quantity: 1
                },
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        const atcResp = await callAtcApi.json();
        console.log(atcResp);
    }

    async regsiterUser(userDetails: RegisterUser) {
        const registerCall = await this.apiContext.post(`${process.env.API_URL}/users/register`,
            {
                data: {
                    first_name: userDetails.fName,
                    last_name: userDetails.lName,
                    email: userDetails.email,
                    password: userDetails.password,
                    address: {
                        street: userDetails.address.street,
                        house_number: userDetails.address.house_number,
                        city: userDetails.address.city,
                        state: userDetails.address.state,
                        country: userDetails.address.country,
                        postal_code: userDetails.address.postal_code
                    }
                }

            }
        );
        const registerResp = await registerCall.json();
        return registerResp;

    }

    async loginUserGetToken(user: LoginUser) {
        const loginCall = await this.apiContext.post(`${process.env.API_URL}/users/login`,
            {
                data: {
                    email: user.email,
                    password: user.password
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        const loginCallJson = await loginCall.json();
        // console.log(loginCallJson)
        return loginCallJson.access_token;

    }

    async setLoginUserToken(token: string, page: Page) {
        await page.addInitScript(value => {
            window.localStorage.setItem('auth-token', value);
        }, token)
    }

    async setLoginUserTokenReload(token: string, page: Page) {
        await page.evaluate(value => {
            window.localStorage.setItem('auth-token', value);
        }, token);
        await page.reload();
    }

    async createOrderForUser(cartId: string, authToken: string, createOrderPayload: CreateOrderPayload) {
        const orderCall = await this.apiContext.post(`${process.env.API_URL}/invoices`, {
            data: {

                ...createOrderPayload,
                "cart_id": cartId
            },
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        const orderJson = await orderCall.json();
        return orderJson
    }


}