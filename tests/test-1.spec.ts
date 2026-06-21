import { test, expect } from '@playwright/test';
import { TestDataFactory } from '../utils/testDataFactory';
import { PaymentTypes } from '../interfaces/checkout/PaymentTypes';
import {  CreateOrderPayload, CreateOrderPayloadBase, PaymentDetails } from '../interfaces/checkout/CreateOrderPayload';


// test('test', async ({ page }) => {
//   await page.goto('https://practicesoftwaretesting.com/auth/login');
//   await page.locator('[data-test="email"]').click();
//   await page.locator('[data-test="email"]').fill('testuser12nabil@yopmail.com');
//   await page.locator('[data-test="password"]').click();
//   await page.locator('[data-test="password"]').fill('11992288@Nn');
//   await page.locator('[data-test="login-submit"]').click();
//   await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
//   await page.locator('[data-test="page-title"]').click();
// });
test('test', async()=>{
  let testng = new TestDataFactory;
  let orderDetails: Partial<CreateOrderPayload>={
    billing_city: 'Hyderabad',
    payment_method: "credit-card",
  }
  let order = testng.getOrderDetails({
    billing_city: 'Hyderabad',
    payment_method: "credit-card",
  });
  console.log(order);
})