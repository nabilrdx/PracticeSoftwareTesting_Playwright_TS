import { Locator, Page } from "@playwright/test";

export class ProductListing_SearchPage {
    page: Page;
    searchInput: Locator;
    searchCta: Locator;
    searchCompletedSection: Locator;
    returnedResultProduct: Locator;
    noRsultsMessage: Locator;
    productTitle: Locator;
    productPrices: Locator;
    sortByDropDown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('[data-test="search-query"]');
        this.searchCta = page.locator('[data-test="search-submit"]');
        this.searchCompletedSection = page.locator('[data-test="search_completed"]');
        this.returnedResultProduct = page.locator('[data-test*="product-"]').first().locator('h5');
        this.noRsultsMessage = page.locator('[data-test="no-results"]');
        this.productTitle = page.locator('[data-test="product-name"]');
        this.sortByDropDown = page.locator('[data-test="sort"]');
        this.productPrices = page.locator('[data-test="product-price"]')
    }

    async searchProduct(product: string) {
        await this.searchInput.fill(product);
        await this.searchCta.click();
    }

    async searchCompleted() {
        await this.searchCompletedSection.waitFor();
    }

    async verifySearchResult(result: string) {
        let productName = await this.returnedResultProduct.textContent();
        let returnVal = String(productName).includes(result);
        console.log(returnVal)
        return returnVal;
    }

    async verifyNoResult() {
        return String(await this.noRsultsMessage.textContent()).trim();
    }

    async getAllProducts() {
        return await this.productTitle.allTextContents();
    }

    async selectCategory(category: string) {
        
        await this.page.getByLabel(category, {
            exact: true
        }).check({ force: true });
        await this.waitForProductResponse();
        // await this.page.locator('[data-test="filter_completed"]').waitFor();

        // await this.waitForPlpDataUiUpdate();
    }

    async sortBy(value: string) {
        await this.sortByDropDown.selectOption(value);
        await this.waitForProductResponse();
        // await this.page.locator('[data-test="filter_completed"]').waitFor(
        // {
        //     state:"attached"
        // }
        // );

        // await this.waitForPlpDataUiUpdate();
    }

    async getproductPricesLowTohigh() {
        const pricesString = await this.productPrices.allTextContents();
        return pricesString.map(price => price.split('$')[1]).map(Number).sort((a, b) => a - b);
    }

    async getproductPrices(){
        const pricesString = await this.productPrices.allTextContents();
        return pricesString.map(price => price.split('$')[1]).map(Number);
    }

     waitForProductResponse(){
        const responsePromise = this.page.waitForResponse(
            response =>
                response.url().includes('/products') &&
                response.status() === 200
        );
        return responsePromise;
    }

    async waitForPlpDataUiUpdate(){
        
        await this.page.locator('[data-test="filter_started"]').waitFor(
            {
                state: "attached"
            }
        );
        await this.page.locator('[data-test="filter_started"]').waitFor(
            {
                state: "hidden"
            }
        );
    }

}