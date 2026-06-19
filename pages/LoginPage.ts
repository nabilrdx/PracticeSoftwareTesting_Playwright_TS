import { Page, Locator, expect } from '@playwright/test';
import { RegistrationForm } from '../interfaces/user/RegistrationForm';
import { LoginUser } from '../interfaces/user/LoginUser';
export class LoginPage {
    page: Page;
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    regFormFirstName: Locator;
    regFormLastName: Locator;
    regFormDob: Locator;
    regFormCountry: Locator;
    regFormPostalCode: Locator;
    regFormHouseNo: Locator;
    regFormMobileNo: Locator;
    regFormEmail: Locator;
    regFormPassword: Locator;
    regFormRegisterCTA: Locator;
    regFormAddLookUp: Locator;


    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-submit"]');
        this.regFormFirstName = page.locator('[data-test="first-name"]');
        this.regFormLastName = page.locator('[data-test="last-name"]');
        this.regFormDob = page.locator('[data-test="dob"]');
        this.regFormCountry = page.locator('[data-test="country"]');
        this.regFormPostalCode = page.locator('[data-test="postal_code"]');
        this.regFormHouseNo = page.locator('[data-test="house_number"]');
        this.regFormMobileNo = page.locator('[data-test="phone"]');
        this.regFormEmail = page.locator('[data-test="email"]');
        this.regFormPassword = page.locator('[data-test="password"]');
        this.regFormRegisterCTA = page.locator('[data-test="register-submit"]');
        this.regFormAddLookUp = page.locator('[data-test="postcode-lookup-loading"]');
    }

    async navigateToLoginPage() {
        await this.page.goto('/auth/login');
    }

    async login(user: LoginUser) {
        // await this.page.goto('https://practicesoftwaretesting.com/auth/login');
        // await this.navigateToLoginPage();
        await this.emailInput.click();
        await this.emailInput.fill(user.email);
        await this.passwordInput.click();
        await this.passwordInput.fill(user.password);
        await this.loginButton.click();
        // await this.page.pause()
    }

    async navigateToRegistrationPage(){
        await this.page.goto('/auth/register');
    }

    async fillRegistrationForm(registrationFormData: RegistrationForm){
        await this.regFormFirstName.fill(registrationFormData.fname);
        await this.regFormLastName.fill(registrationFormData.lname);
        await this.regFormDob.fill(registrationFormData.dob);
        await this.regFormCountry.selectOption(registrationFormData.country);
        await this.regFormPostalCode.fill(registrationFormData.postalCode);
        await this.regFormHouseNo.click();
        await this.regFormHouseNo.fill(registrationFormData.houseNo);
        await this.regFormMobileNo.click();
        await this.regFormAddLookUp.waitFor({state: 'visible'});
        await this.regFormAddLookUp.waitFor({state: 'hidden'});
        await this.regFormMobileNo.fill(registrationFormData.phoneNo);
        await this.regFormEmail.fill(registrationFormData.email);
        await this.regFormPassword.fill(registrationFormData.password);
    }

    async submitRegistrationForm(){
        await this.regFormRegisterCTA.click();
    }


}