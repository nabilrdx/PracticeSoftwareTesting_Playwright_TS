import{expect} from '@playwright/test';
import {test} from '../../fixtures/baseFixture';
import { ProductListing_SearchPage } from '../../pages/ProductListing_searchPage';
import data from '../../data/data.json'

test.describe('Product Listing/Search Module', ()=>{
    test('Verify user can search existing product', async({page, productListing_searchPage})=>{
        // let productListing_searchPage = new ProductListing_SearchPage(page);

        await page.goto('/');
        await productListing_searchPage.searchProduct(data.products.existingProduct);
        await productListing_searchPage.searchCompleted();
        expect(await productListing_searchPage.verifySearchResult(data.products.existingProduct)).toBeTruthy();
    })

    test('Verify user sees no results for non-existing product', async({page, productListing_searchPage})=>{
        // let productListing_searchPage = new ProductListing_SearchPage(page);

        await page.goto('/');
        await productListing_searchPage.searchProduct(data.products.nonExistingProduct);
        await productListing_searchPage.searchCompleted();
        expect(await productListing_searchPage.verifyNoResult()).toContain('There are no products found.')

    })
})