import { Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
    productName: Locator;
    productPrice: Locator;
    page: Page;
    atcButton: Locator;
    atcToastMessage: Locator
    constructor(page: Page) {
        this.productName = page.locator('[data-test="product-name"]');
        this.productPrice = page.locator('[data-test="unit-price"]');
        this.page = page;
        this.atcButton=page.locator('[data-test="add-to-cart"]');
        this.atcToastMessage= page.getByText(' Product added to shopping cart. ')
    }

    async navigateToPdp(pdpUrl: string) {
        await this.page.goto(pdpUrl);
    }

    async verifyNameAndPrice(name: string, price: string) {
        return await this.productName.textContent() == name && await this.productPrice.textContent() == price;
    }

    async addToCart(){
        await this.atcButton.click();
    }

}