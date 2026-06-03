import { test, expect, request } from '@playwright/test';
import data from '../../data/data.json';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';

test.describe('Product Details Moule', () => {
    let productIdForUrl: String;
    test.beforeAll(async () => {
        const apiContext = await request.newContext();
        const response = await apiContext.fetch('https://api.practicesoftwaretesting.com/products/search?q=hammer');
        const responseJson = await response.json();
        console.log(responseJson.data[0].id, 'ProductID');
        productIdForUrl = responseJson.data[0].id;
    })

    test('Verify product details page loads successfully', async ({ page }) => {
        let productDetailsPage = new ProductDetailsPage(page);

        await productDetailsPage.navigateToPdp(`${data.pdp.productUrl}${productIdForUrl}`);
        expect(await productDetailsPage.verifyNameAndPrice(data.pdp.productName, data.pdp.price)).toBeTruthy();
    });

    test('Verify Add TO Cart', async ({ page }) => {
        let productDetailsPage = new ProductDetailsPage(page);
        await productDetailsPage.navigateToPdp(`${data.pdp.productUrl}${productIdForUrl}`);
        await productDetailsPage.addToCart();
        // await page.getByText(data.pdp.atcToastMessage).waitFor();
        await expect(page.getByRole("alert")).toHaveText(data.pdp.atcToastMessage);
    })

})
