import { APIRequestContext, request } from "@playwright/test";

export class ApiHelper {
    apiContext: APIRequestContext;
    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async getProductId() {
        let productIdForUrl: string;
        // const apiContext = await request.newContext();
        const response = await this.apiContext.fetch('https://api.practicesoftwaretesting.com/products/search?q=hammer');
        const responseJson = await response.json();
        console.log(responseJson.data[0].id, 'ProductID');
        productIdForUrl = responseJson.data[0].id;
        return productIdForUrl;

    }

    async createCart(){

    // const apiContext = await request.newContext();
    const call = await this.apiContext.post('https://api.practicesoftwaretesting.com/carts')
    const callRespJson = await call.json();
    console.log(callRespJson.id);
    return callRespJson.id;


}

    async addItemToCart(cartId: string){
    const callAtcApi = await this.apiContext.post(`https://api.practicesoftwaretesting.com/carts/${cartId}`,
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

}