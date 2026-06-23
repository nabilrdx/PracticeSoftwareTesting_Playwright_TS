import { expect } from '@playwright/test';
import { test } from '../../fixtures/baseFixture';
import { ProductListing_SearchPage } from '../../pages/ProductListing_searchPage';
import { PlpData } from '../../data/Plp/PlpData';

test.describe('Product Listing/Search Module', () => {
    test('Verify user can search existing product @smoke', async ({ page, productListing_searchPage }) => {
        // let productListing_searchPage = new ProductListing_SearchPage(page);

        await page.goto('/');
        await productListing_searchPage.searchProduct(PlpData.search.existing);
        await productListing_searchPage.searchCompleted();
        expect(await productListing_searchPage.verifySearchResult(PlpData.search.existing)).toBeTruthy();
    });

    test('Verify user sees no results for non-existing product @smoke', async ({ page, productListing_searchPage }) => {
        // let productListing_searchPage = new ProductListing_SearchPage(page);

        await page.goto('/');
        await productListing_searchPage.searchProduct(PlpData.search.nonExisting);
        await productListing_searchPage.searchCompleted();
        expect(await productListing_searchPage.verifyNoResult()).toContain('There are no products found.')

    });

    test('Verify filter by category @regression', async ({ page, productListing_searchPage, dataFactory }) => {
            const category:string = PlpData.filter.category.Saw;

        await test.step('Navigate to PLP', async () => {
            await page.goto('/');
        });
        const products = await test.step('Select Category', async () => {
            await productListing_searchPage.selectCategory(category);

            const responsePromise = page.waitForResponse(
                response =>
                    response.url().includes('/products') &&
                    response.status() === 200
            );
            await responsePromise;
            const productsTitleArray = await productListing_searchPage.getAllProducts();
            return productsTitleArray;
        });
        await test.step('Verify the results', async () => {
            for (const prod of products) {
                expect(prod.trim().toLowerCase()).toContain(category.trim().toLowerCase())
            }
        });
    })

    test('Verify products can be sorted by from price low to high', async({page, productListing_searchPage})=>{
        await test.step('Navigate to PLP', async()=>{
            const category:string = PlpData.filter.category.Hammer;
            await page.goto('/');
            await productListing_searchPage.selectCategory(category);
        });
        const expectedPrice = await test.step('Capture product prices before applying sort by', async()=>{
            return await productListing_searchPage.getproductPricesLowTohigh()
        })
        console.log(expectedPrice);
        const sortedPrice= await test.step('Apply sort by filter as price low to high & capture prices', async()=>{
            await productListing_searchPage.sortBy(PlpData.sort.lowToHigh);
            return await productListing_searchPage.getproductPrices();
        });
        console.log(sortedPrice);
        await test.step('Verify that products are listed as price low to high', async()=>{
            expect(sortedPrice).toEqual(expectedPrice);
        });
    })

})