import {  expect, request } from '@playwright/test';
import {test} from '../../fixtures/baseFixture';

import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { ApiHelper } from '../../utils/ApiHelper';
import { PdpData } from '../../data/PdpData';

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

    test('Verify product details page loads successfully @smoke', async ({ page, productDetailsPage }) => {
        // let productDetailsPage = new ProductDetailsPage(page);

        await productDetailsPage.navigateToPdp(`${PdpData.productUrl}${productIdForUrl}`);
        expect(await productDetailsPage.verifyProduct(PdpData.expected.productDetails)).toBeTruthy();
    });

    test('Verify Add To Cart @smoke', async ({ page,productDetailsPage }) => {
        // let productDetailsPage = new ProductDetailsPage(page);
        await productDetailsPage.navigateToPdp(`${PdpData.productUrl}${productIdForUrl}`);
        await productDetailsPage.addToCart();
        // await page.getByText(data.pdp.atcToastMessage).waitFor();
        await expect(page.getByRole("alert")).toHaveText(PdpData.expected.message.atcToastMessage);
    })

})