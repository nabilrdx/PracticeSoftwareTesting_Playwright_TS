import {  expect, request } from '@playwright/test';
import {test} from '../../fixtures/baseFixture';

import data from '../../data/data.json';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { ApiHelper } from '../../utils/ApiHelper';

test.describe('Product Details Module',  () => {
    let productIdForUrl: string;
    test.beforeAll(async () => {
        const apiContext = await request.newContext();
        const apiHelper=new ApiHelper(apiContext);
        // const apiContext = await request.newContext();
        // const response = await apiContext.fetch('https://api.practicesoftwaretesting.com/products/search?q=hammer');
        // const responseJson = await response.json();
        // console.log(responseJson.data[0].id, 'ProductID');
        productIdForUrl = await apiHelper.getProductId();
;
    })

    test('Verify product details page loads successfully', async ({ page, productDetailsPage }) => {
        // let productDetailsPage = new ProductDetailsPage(page);

        await productDetailsPage.navigateToPdp(`${data.pdp.productUrl}${productIdForUrl}`);
        expect(await productDetailsPage.verifyNameAndPrice(data.pdp.productName, data.pdp.price)).toBeTruthy();
    });

    test('Verify Add To Cart', async ({ page,productDetailsPage }) => {
        // let productDetailsPage = new ProductDetailsPage(page);
        await productDetailsPage.navigateToPdp(`${data.pdp.productUrl}${productIdForUrl}`);
        await productDetailsPage.addToCart();
        // await page.getByText(data.pdp.atcToastMessage).waitFor();
        await expect(page.getByRole("alert")).toHaveText(data.pdp.atcToastMessage);
    })

})