import { expect } from '@playwright/test';
import { test } from '../../fixtures/baseFixture';
import { LoginPage } from '../../pages/LoginPage';
import { LoginUser } from '../../interfaces/LoginUser';
import { UserData } from '../../data/UserData';

test.describe('Login Module', () => {
    test('Verify valid user login @smoke @regression', async ({ page, loginPage }) => {
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

    test('Verify invalid user login @smoke @regression', async ({ page, loginPage }) => {
        // let loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login(UserData.invalidUser);
        await expect(page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
    });

    test('Verify user is able to logout @regression', async ({ page, loginPage, apiHelper, headerComponent }) => {
        const loginToken = await test.step('Login user via API & get the token', async () => {
            return await apiHelper.loginUserGetToken(UserData.validUser);
        });

        await test.step('Visit the home page of the application', async () => {
            await page.goto('/');
        });

        await test.step('Set the token to browser"s local storage', async () => {
            await apiHelper.setLoginUserTokenReload(loginToken, page);
        });

        await test.step('Logout from the navigation dropdown', async () => {
            await headerComponent.clickHeaderDropdown();
            await headerComponent.signOutFromHeader();

        });
        await test.step('Verify user is loggd out successfully & is on the login page', async () => {
            await page.pause();
            await expect(page.locator('[data-test="nav-sign-in"]')).toBeVisible();
        });
    });

    test('Verify new user registration', async ({ page, loginPage, dataFactory}) => {
        const registrationData = dataFactory.getRegistrationData({fname:'John'});

        await test.step('Navigate to registration page', async () => {
            await loginPage.navigateToRegistrationPage();
        });
        await test.step('Fill registration form', async () => {
            await loginPage.fillRegistrationForm(registrationData)
        });
        await test.step('Submit registration form', async () => { 
            await loginPage.submitRegistrationForm();
        });
        await test.step('Verify user is registered successfully by logging in the user ', async () => { 
            await expect(page).toHaveURL('/auth/login');
            const loginData = {
                email: registrationData.email,
                password: registrationData.password
            }
            await loginPage.login(loginData);
            await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
        });
    });

});