import{expect} from '@playwright/test';
import {test} from '../../fixtures/baseFixture';
import { ProductListing_SearchPage } from '../../pages/ProductListing_searchPage';
import { PlpData } from '../../data/PlpData';

test.describe('Product Listing/Search Module', ()=>{
    test('Verify user can search existing product @smoke', async({page, productListing_searchPage})=>{
        // let productListing_searchPage = new ProductListing_SearchPage(page);

        await page.goto('/');
        await productListing_searchPage.searchProduct(PlpData.search.existing);
        await productListing_searchPage.searchCompleted();
        expect(await productListing_searchPage.verifySearchResult(PlpData.search.nonExisting)).toBeTruthy();
    })

    test('Verify user sees no results for non-existing product @smoke', async({page, productListing_searchPage})=>{
        // let productListing_searchPage = new ProductListing_SearchPage(page);

        await page.goto('/');
        await productListing_searchPage.searchProduct(PlpData.search.nonExisting);
        await productListing_searchPage.searchCompleted();
        expect(await productListing_searchPage.verifyNoResult()).toContain('There are no products found.')

    })
})