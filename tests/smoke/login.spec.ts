import { expect } from '@playwright/test';
import { test } from '../../fixtures/baseFixture';
import { LoginPage } from '../../pages/LoginPage';
import { UserData } from '../../data/User/UserData';

test.describe('Login Module', () => {
    test('Verify valid user login @smoke', async ({ page, loginPage }) => {
        // let loginPage = new LoginPage(page);
        await test.step('Navigate to login page', async () => {
            await loginPage.navigateToLoginPage();
        })

        await test.step('Enter valid creds & perform login', async () => {

            await loginPage.login(UserData.validUser);
        })

        await test.step('Verify user is successfully logged in.', async () => {
            await expect(page.locator('[data-test="page-title"]')).toContainText('My account');

        })
    })

    test('Verify invalid user login @smoke', async ({ page, loginPage }) => {
        // let loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login(UserData.invalidUser);
        await expect(page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
    })
});