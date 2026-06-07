import {  expect, request } from '@playwright/test';
import {test} from '../../fixtures/baseFixture';
import { ApiHelper } from '../../utils/ApiHelper';
import { CartPage } from '../../pages/CartPage';
import data from '../../data/data.json'
import { OrderHistoryPage } from '../../pages/OrderHistoryPage';
test.describe('Order History Module',()=>{
test('Verify the placed order is available under order history page of the user. @smoke', async ({ page, orderHistoryPage,apiHelper }) => {
    // const apiContext = await request.newContext();
    // const apiHelper = new ApiHelper(apiContext);
    // let orderHistoryPage = new OrderHistoryPage(page);

    const user = await apiHelper.regsiterUser(data.orderHistoryData.registerUser.fName, data.orderHistoryData.registerUser.lName, `qa-${Date.now()}@yopmail.com`, data.orderHistoryData.registerUser.password, data.orderHistoryData.registerUser.address);
    console.log(user.email, '11992288@Nn', ':::Newly registered user');

    const token = await apiHelper.loginUserGetToken(user.email, '11992288@Nn');
    // console.log(token, ':::token');
    await apiHelper.setLoginUserToken(token, page);

    const cartId = await apiHelper.createCartForLoggedInUser(token);
    await apiHelper.addItemToCartForLoginUser(cartId, token);

    const orderDetails = await apiHelper.createOrderForUser(cartId, token, data.createOrderPayload);
    console.log(orderDetails.invoice_number, ':::Invoice number created')

    await orderHistoryPage.navigateToOrderHistoryPage()

    const getOrderRow = await orderHistoryPage.getRowForOrder(orderDetails.invoice_number);
    expect(await getOrderRow.locator('td').first().textContent()).toContain(orderDetails.invoice_number);
});
});
// const cartId = await apiHelper.createCart();
// await apiHelper.addItemToCart(cartId);
//Above is for guest cart -> it can also be used to assign it to authenticated user