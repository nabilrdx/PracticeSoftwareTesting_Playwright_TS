import { Locator, Page } from "@playwright/test";
import { BillingDetails } from "../interfaces/checkout/BillingDetails";
import { PaymentTypes } from "../interfaces/checkout/PaymentTypes";
import { existingTerm } from "../interfaces/Product/SearchTerms";



export class CartPage {
    page: Page;
    cartItemLoaded: Locator;
    checkoutCta: Locator;
    continueAsGuestCta: Locator;
    addedItemsBody: Locator;
    guestEmail: Locator;
    guestFirstName: Locator;
    guestLastName: Locator;
    continueAsGuestFormCta: Locator;
    guestProceedToCheckout:Locator;
    billingCountryDropDown:Locator;
    billingPostal:Locator;
    billingHouseNo:Locator;
    billingStreet:Locator;
    billingCity:Locator;
    billingState:Locator;
    billingProceed:Locator;
    paymentType:Locator;
    confirmPaymentCta:Locator;
    paymentSuccessMessage:Locator;
    orderId:Locator;
    
    



    constructor(page: Page) {
        this.page = page;
        this.cartItemLoaded = this.page.locator('[data-test="product-title"]').first();
        this.checkoutCta = this.page.getByRole("button", { name: 'Proceed to checkout' });
        this.continueAsGuestCta = this.page.getByRole("tab", { name: 'Continue as Guest' });
        this.guestEmail = this.page.locator('[data-test="guest-email"]');
        this.guestFirstName = this.page.locator('[data-test="guest-first-name"]');
        this.guestLastName = this.page.locator('[data-test="guest-last-name"]');
        this.continueAsGuestFormCta = this.page.locator('[data-test="guest-submit"]');
        this.guestProceedToCheckout=this.page.locator('[data-test="proceed-2-guest"]');
        this.billingCountryDropDown=this.page.locator('[data-test="country"]');
        this.billingPostal=this.page.locator('[data-test="postal_code"]');
        this.billingHouseNo=this.page.locator('[data-test="house_number"]');
        this.billingStreet=this.page.locator('[data-test="street"]');
        this.billingCity=this.page.locator('[data-test="city"]');
        this.billingState=this.page.locator('[data-test="state"]');
        this.billingProceed=this.page.locator('[data-test="proceed-3"]');
        this.paymentType=this.page.locator('[data-test="payment-method"]');
        this.confirmPaymentCta=this.page.locator('[data-test="finish"]');
        this.paymentSuccessMessage=this.page.locator('[data-test="payment-success-message"]');
        this.orderId=this.page.getByText('INV-');
        this.addedItemsBody = page.locator('tbody');
    }

    async openCartWithId(cartId: string) {
        await this.page.addInitScript(value => {
            window.sessionStorage.setItem('cart_id', value);
        }, cartId);
        await this.page.goto('/checkout');
        await this.cartItemLoaded.waitFor();
    }

    async getProductRow(productName: string) {
        return this.page.locator('tr', {
            hasText: productName
        });
    }

    async proceedToCheckout() {
        await this.checkoutCta.click();
    }

    async selectContinueAsGuest() {
        await this.continueAsGuestCta.click();
        await this.guestEmail.fill('randomemail@yopmail.com')
        await this.guestFirstName.fill('test')
        await this.guestLastName.fill('Test');
        await this.continueAsGuestFormCta.click();
        await this.guestProceedToCheckout.click();

    }

    async fillBillingAddress(billingDetails: BillingDetails){
        await this.billingCountryDropDown.selectOption(billingDetails.country);
        await this.billingPostal.fill(billingDetails.postalCode);
        await this.billingHouseNo.fill(billingDetails.houseNo);
        // await this.billingStreet.fill('Main Park')
        // await this.billingCity.fill('Ohio')
        // await this.billingState.fill('AR')
        // await this.billingState.inputValue()
        await this.billingProceed.click();
    }

    async selectPaymentOption(paymentMode:PaymentTypes[keyof PaymentTypes]){
        await this.paymentType.selectOption(paymentMode);
    }

    async confirmPayment(){
        await this.confirmPaymentCta.click();
    }   

    async verifyPaymentSuccessMessage(){
        await this.paymentSuccessMessage.waitFor();
    }

    async confirmOrder(){
        await this.confirmPaymentCta.click();
    }

    async getOrderId(){
        return await this.orderId.textContent();
    }

    async getAddedItemsDetails(){
        const itemRows = await this.addedItemsBody.locator('tr').all();
        const productDetails = await Promise.all(
            itemRows.map(async (e,i)=>{
            return{
                name:  await e.locator('[data-test="product-title"]').textContent(),
                qty: Number(await e.locator('[data-test="product-quantity"]').inputValue()),
                price: Number(String(await e.locator('[data-test="product-price"]').textContent()).replace('$', '')),
                lineTotalPrice: Number(String(await e.locator('[data-test="line-price"]').textContent()).replace('$', '')),
                itemNumber: i+1
            }
        })
        );
        
    
        return productDetails;
    }



    async calculateAddedItemsTotal(){
        const details = await this.getAddedItemsDetails();
        const total = details.reduce((prev, cur)=>{
            return prev + (cur.price * cur.qty);
        }, 0)
        return total;
    }

    async getCartTotal(){
        const cartTotal = Number(String( await this.page.locator('[data-test="cart-total"]').textContent()).replace('$', '').trim());
        return cartTotal;
    }   

    async removeItemFromCartAndReturnName(productName: existingTerm){
        const productDom = this.page.locator('tr').filter({
            hasText: `${productName}`
        });
        const prdctName = await productDom.locator('[data-test="product-title"]').innerText();
        await productDom.locator('[data-icon="xmark"]').click();
        return prdctName;
    }

}
export interface lookjs{
    name: string;
    qty: number;
    price: number;
    lineTotalPrice: number;
    itemNumber: number;
}