import { Locator, Page } from "@playwright/test";

export class ProductListing_SearchPage {
    page: Page;
    searchInput: Locator;
    searchCta: Locator;
    searchCompletedSection: Locator;
    returnedResultProduct: Locator;
    noRsultsMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('[data-test="search-query"]');
        this.searchCta = page.locator('[data-test="search-submit"]');
        this.searchCompletedSection = page.locator('[data-test="search_completed"]');
        this.returnedResultProduct = page.locator('[data-test*="product-"]').first().locator('h5');
        this.noRsultsMessage = page.locator('[data-test="no-results"]');
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

    async verifyNoResult(){
        return String(await this.noRsultsMessage.textContent()).trim();
    }

}