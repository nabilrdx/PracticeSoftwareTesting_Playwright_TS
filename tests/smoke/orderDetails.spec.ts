import { test, expect, request } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';
import { CartPage } from '../../pages/CartPage';
import data from '../../data/data.json'
import { OrderHistoryPage } from '../../pages/OrderHistoryPage';
import { OrderDetailsPage } from '../../pages/OrderDetailsPage';
test.describe('Order Details Module',()=>{
test('Verify the order details page for the placed order.', async ({ page }) => {
    const apiContext = await request.newContext();
    const apiHelper = new ApiHelper(apiContext);
    const orderDetailsPage=new OrderDetailsPage(page);

    const user = await apiHelper.regsiterUser(data.orderHistoryData.registerUser.fName, data.orderHistoryData.registerUser.lName, `qa-${Date.now()}@yopmail.com`, data.orderHistoryData.registerUser.password, data.orderHistoryData.registerUser.address);
    console.log(user.email, '11992288@Nn', ':::Newly registered user');

    const token = await apiHelper.loginUserGetToken(user.email, '11992288@Nn');
    // console.log(token, ':::token');
    await apiHelper.setLoginUserToken(token, page);

    const cartId = await apiHelper.createCartForLoggedInUser(token);
    await apiHelper.addItemToCartForLoginUser(cartId, token);

    const orderDetails = await apiHelper.createOrderForUser(cartId, token);
    console.log(orderDetails.invoice_number, orderDetails.id, ':::Invoice id for order details page');

    await orderDetailsPage.openOrderDetailsFor(orderDetails.id)
    // await page.pause();
    await expect(page.locator('[data-test="invoice-number"]')).toHaveValue(orderDetails.invoice_number);
    await expect(page.getByRole('cell', { name: 'Claw Hammer with Shock' })).toContainText(data.cart.atcProductName)
});
});
// const cartId = await apiHelper.createCart();
// await apiHelper.addItemToCart(cartId);
//Above is for guest cart -> it can also be used to assign it to authenticated user