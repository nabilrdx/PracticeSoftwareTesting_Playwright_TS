import {  expect, request } from '@playwright/test';
import {test} from '../../fixtures/baseFixture';
import { ApiHelper } from '../../utils/ApiHelper';
import data from '../../data/data.json';
import { CartPage } from '../../pages/CartPage';
import { CartData } from '../../data/CartData';

test.describe('Cart and Checkout Module', () => {

    test.beforeEach(async ({ page }) => {
        //we could even use beforeEach for these 2 cases, but in future at framework grows we might not need to have them, we could use fixtures too or if case we decided to have new isolated cases
    })

    test('Verify added product to cart is available in cart page @smoke', async ({ page, cartPage, apiHelper}) => {
        // const apiContext = await request.newContext();
        // const apiHelper = new ApiHelper(apiContext);
        // const cartPage = new CartPage(page)
        

const cartId =await test.step('Create cart using the cart API', async()=>{
        return await apiHelper.createCart();

});
await test.step('Add item to cart for the newly created cart', async()=>{
        await apiHelper.addItemToCart(cartId);
});
await test.step('Open cart with generated cart id', async()=>{
        await cartPage.openCartWithId(cartId);

});
await test.step('Verify that the item added to cart is available under cart & has correct quantity', async()=>{
    const productRow = await cartPage.getProductRow(CartData.expected.atcProductName);

        await expect(productRow.locator('.product-title')).toHaveText(CartData.expected.atcProductName);
        await expect(productRow.locator('[data-test="product-quantity"]')).toHaveValue(CartData.expected.atcProductQuantity)
});


        
    });

    test('Verify user can proceed to checkout @smoke', async ({ page, cartPage, apiHelper}) => {
        // const apiContext = await request.newContext();
        // const apiHelper = new ApiHelper(apiContext);
        // const cartPage = new CartPage(page)

        const cartId = await apiHelper.createCart();
        await apiHelper.addItemToCart(cartId);
        await cartPage.openCartWithId(cartId);
        await cartPage.proceedToCheckout();
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    })

    test('Verify that user is able to place order @smoke',async({page,cartPage, apiHelper})=>{
        // const apiContext = await request.newContext();
        // const apiHelper = new ApiHelper(apiContext);
        // const cartPage = new CartPage(page)

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
        expect(orderId).toContain('INV-');
    })

})

