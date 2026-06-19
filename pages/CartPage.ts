import { Locator, Page } from "@playwright/test";
import { BillingDetails, PaymentTypes } from "../interfaces/CartModel";




export class CartPage {
    page: Page;
    cartItemLoaded: Locator;
    checkoutCta: Locator;
    continueAsGuestCta: Locator;
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


}