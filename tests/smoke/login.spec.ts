import  {expect} from '@playwright/test';
import {test} from '../../fixtures/baseFixture';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../data/data.json'; 

test.describe('Login Module', () => {
    test('Verify valid user login', async({page, loginPage})=>{
        // let loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.validLogin(users.validUser.email, users.validUser.password);
        await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
    })

    test('Verify invalid user login', async({page, loginPage})=>{
        // let loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.inValidLogin(users.invalidUser.email, users.invalidUser.password);
        await expect(page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
    })
});