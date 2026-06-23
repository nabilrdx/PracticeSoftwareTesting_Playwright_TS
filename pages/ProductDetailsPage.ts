import { Locator, Page } from "@playwright/test";
import { ProductDetails } from "../interfaces/Product/ProductDetails";

export class ProductDetailsPage {
    productName: Locator;
    productPrice: Locator;
    page: Page;
    atcButton: Locator;
    atcToastMessage: Locator;
    quantityDom: Locator;
    quantityField: Locator;
    constructor(page: Page) {
        this.productName = page.locator('[data-test="product-name"]');
        this.productPrice = page.locator('[data-test="unit-price"]');
        this.page = page;
        this.atcButton=page.locator('[data-test="add-to-cart"]');
        this.atcToastMessage= page.getByText(' Product added to shopping cart. ');
        this.quantityDom= page.locator('.quantity');
        this.quantityField = page.locator('[data-test="quantity"]');
    }

    async navigateToPdp(pdpUrl: string) {
        await this.page.goto(pdpUrl);
    }

    async verifyProduct(productDetails: ProductDetails) {
        return await this.productName.textContent() == productDetails.productName && Number(await this.productPrice.textContent()) == productDetails.price;
    }

    async addToCart(){
        await this.atcButton.click();
    }

    async addQuantity(qty: number){
        for(let i=1; i<qty; i++){
            await this.quantityDom.locator('[data-test="increase-quantity"]').click();
        }
        return qty;
    }

    async getQty(){
        return Number(await this.quantityField.inputValue())
    }

}