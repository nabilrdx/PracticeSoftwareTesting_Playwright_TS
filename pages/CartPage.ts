import { Locator, Page } from "@playwright/test";

export class CartPage {
    page: Page;
    cartItemLoaded: Locator;
    checkoutCta: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItemLoaded = this.page.locator('[data-test="product-title"]').first();
        this.checkoutCta= this.page.getByRole("button",{name: 'Proceed to checkout'})
    }

    async openCartWithId(cartId: string) {
        await this.page.addInitScript(value => {
            window.sessionStorage.setItem('cart_id', value);
        }, cartId);
        await this.page.goto('https://practicesoftwaretesting.com/checkout');
        await this.cartItemLoaded.waitFor();
    }

    async getProductRow(productName: string) {
        return this.page.locator('tr', {
            hasText: productName
        });
    }

    async proceedToCheckout(){
        await this.checkoutCta.click();
    }



}