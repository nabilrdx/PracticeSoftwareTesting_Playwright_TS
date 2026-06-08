import { expect } from '@playwright/test';
import { test } from '../../fixtures/baseFixture';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../data/data.json';

test.describe('Login Module', () => {
    test('Verify valid user login @smoke', async ({ page, loginPage }) => {
        // let loginPage = new LoginPage(page);
        await test.step('Navigate to login page', async () => {
            await loginPage.navigateToLoginPage();
        })

        await test.step('Enter valid creds & perform login', async()=>{

            await loginPage.validLogin(users.validUser.email, users.validUser.password);
        })
        
        await test.step('Verify user is successfully logged in.', async()=>{
            await expect(page.locator('[data-test="page-title"]')).toContainText('My account');

        })
    })

    test('Verify invalid user login @smoke', async ({ page, loginPage }) => {
        // let loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.inValidLogin(users.invalidUser.email, users.invalidUser.password);
        await expect(page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
    })
});