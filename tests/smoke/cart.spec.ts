import { test, expect, request } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';
import data from '../../data/data.json';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart and Checkout Module', () => {

    test.beforeEach(async ({ page }) => {
        //we could even use beforeEach for these 2 cases, but in future at framework grows we might not need to have them, we could use fixtures too or if case we decided to have new isolated cases
    })

    test('Verify added product to cart is available in cart page', async ({ page }) => {
        const apiContext = await request.newContext();
        const apiHelper = new ApiHelper(apiContext);
        const cartPage = new CartPage(page)

        const cartId = await apiHelper.createCart();
        await apiHelper.addItemToCart(cartId);
        await cartPage.openCartWithId(cartId);

        const productRow = await cartPage.getProductRow(data.cart.atcProductName);

        await expect(productRow.locator('.product-title')).toHaveText(data.cart.atcProductName);
        await expect(productRow.locator('[data-test="product-quantity"]')).toHaveValue(data.cart.atcProductQuantity)
    });

    test('Verify user can proceed to checkout', async ({ page }) => {
        const apiContext = await request.newContext();
        const apiHelper = new ApiHelper(apiContext);
        const cartPage = new CartPage(page)

        const cartId = await apiHelper.createCart();
        await apiHelper.addItemToCart(cartId);
        await cartPage.openCartWithId(cartId);
        await cartPage.proceedToCheckout();
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    })

    test('Verify that user is able to place order',async({page})=>{
        const apiContext = await request.newContext();
        const apiHelper = new ApiHelper(apiContext);
        const cartPage = new CartPage(page)

        const cartId = await apiHelper.createCart();
        await apiHelper.addItemToCart(cartId);
        await cartPage.openCartWithId(cartId);
        await cartPage.proceedToCheckout();
        await cartPage.selectContinueAsGuest();
        await cartPage.fillBillingAddress(data.checkoutData.billingDetails);
        await cartPage.selectPaymentOption(data.checkoutData.paymentMode);
        await cartPage.confirmPayment();
        await cartPage.verifyPaymentSuccessMessage();
        await cartPage.confirmOrder();
        const orderId =  await cartPage.getOrderId();
        console.log(orderId);
    })

})

