import { expect, request } from '@playwright/test';
import { test } from '../../fixtures/baseFixture';
import { ApiHelper } from '../../utils/ApiHelper';
import { CartPage } from '../../pages/CartPage';
import { OrderHistoryPage } from '../../pages/OrderHistoryPage';
import { OrderDetailsPage } from '../../pages/OrderDetailsPage';
import { CartData } from '../../data/Cart/CartData';
import { CreateOrderDataBankTransfer, CreateOrderDataBuyNow, CreateOrderDataCod, CreateOrderDataCreditCard, CreateOrderDataGiftCard } from '../../data/Order/CreateOrderData';
import { PlpData } from '../../data/Plp/PlpData';
test.describe('Order Details Module', () => {
    test('Verify the order details page for the placed order. @smoke', async ({ page, orderDetailsPage, apiHelper, dataFactory }) => {
        // const apiContext = await request.newContext();
        // const apiHelper = new ApiHelper(apiContext);
        // const orderDetailsPage=new OrderDetailsPage(page);
        const newUserDetails = dataFactory.getNewUserDetails();
        const CreateOrderData = dataFactory.getOrderDetails();
        const user = await test.step('Register new user with API', async () => {
            return await apiHelper.regsiterUser(newUserDetails);
        })
        

        const token = await test.step('Login the newly registered user & get the token', async () => {
            return await apiHelper.loginUserGetToken({ email: user.email, password: '11992288@Nn' });
        })
        // console.log(token, ':::token');
        await test.step('Set the token to browser', async () => {
            await apiHelper.setLoginUserToken(token, page);

        })

        const cartId = await test.step('Create cart id with the user token', async () => {
            return await apiHelper.createCartForLoggedInUser(token);

        });
        await test.step('Add item to cart for the user with created cart & token', async () => {
            await apiHelper.addItemToCartForLoginUser(cartId, token, PlpData.search.existing);

        });

        const orderDetails = await test.step('Create order for user using the API', async () => {
            return await apiHelper.createOrderForUser(cartId, token, CreateOrderData);

        });
        console.log(orderDetails.invoice_number, orderDetails.id, ':::Invoice id for order details page');
        console.log(orderDetails, ':::Invoice id for order details page');

        await test.step('Open order details page for the created order', async () => {
            await orderDetailsPage.openOrderDetailsFor(orderDetails.id)

        })
        // await page.pause();

        await test.step('Verify the created order ID & the product used for placing the order on Order Details page', async () => {
            await expect(page.locator('[data-test="invoice-number"]')).toHaveValue(orderDetails.invoice_number);
            await expect(page.getByRole('cell', { name: 'Claw Hammer with Shock' })).toContainText(CartData.expected.atcProductName)
        })

    });
});
// const cartId = await apiHelper.createCart();
// await apiHelper.addItemToCart(cartId);
//Above is for guest cart -> it can also be used to assign it to authenticated user