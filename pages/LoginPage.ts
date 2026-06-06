import { Page, Locator, expect } from '@playwright/test';
export class LoginPage {
    page: Page;
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-submit"]');

    }

    async navigateToLoginPage() {
        await this.page.goto('/auth/login');
    }

    async validLogin(email: string, password: string) {
        // await this.page.goto('https://practicesoftwaretesting.com/auth/login');
        // await this.navigateToLoginPage();
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        // await this.page.pause()
    }

    async inValidLogin(email: string, password: string) {
        // await this.page.goto('https://practicesoftwaretesting.com/auth/login');
        // await this.navigateToLoginPage();
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        // await this.page.pause()

    }


}