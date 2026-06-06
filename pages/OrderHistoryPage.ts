import { Locator, Page } from "@playwright/test";

export class OrderHistoryPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToOrderHistoryPage() {
        await this.page.goto('https://practicesoftwaretesting.com/account/invoices');
    }

async getRowForOrder(orderId:string){
    return this.page.locator('tr', { hasText: orderId });
}

}