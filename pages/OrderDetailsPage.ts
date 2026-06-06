import { Page } from "@playwright/test";

export class OrderDetailsPage{
    page: Page;
    constructor(page:Page){
        this.page=page
    }

    async openOrderDetailsFor(invoice_id:string){
        await this.page.goto(`https://practicesoftwaretesting.com/account/invoices/${invoice_id}`);
        await this.page.locator('[data-test="invoice-number"]').waitFor();
    }

}