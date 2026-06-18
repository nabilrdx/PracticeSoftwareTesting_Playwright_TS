import { Locator, Page } from "@playwright/test";
export class headerComponent{

        headerDropdown: Locator;
        signOutCta: Locator;
        page: Page;
    
        constructor(page:Page){
            this.page = page;
            this.headerDropdown = this.page.locator('[data-test="nav-menu"]');
            this.signOutCta= this.page.locator('[data-test="nav-sign-out"]');
        }

    async clickHeaderDropdown(){
        await this.headerDropdown.click();
    }

    async signOutFromHeader(){
        await this.signOutCta.click();
    }
}