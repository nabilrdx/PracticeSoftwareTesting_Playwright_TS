import { expect } from '@playwright/test';
import { test } from '../../fixtures/baseFixture';
import { PdpData } from '../../data/Pdp/PdpData';
import { PlpData } from '../../data/Plp/PlpData';
import { ApiHelper } from '../../utils/ApiHelper';
import { CartData } from '../../data/Cart/CartData';
import { existingTerm } from '../../interfaces/Product/SearchTerms';

test('Verify cart total', async ({ page, apiHelper, cartPage }) => {

    const cartId = await apiHelper.createCart();
    await apiHelper.addItemToCart(cartId, PlpData.search.existing, 2);
    await apiHelper.addItemToCart(cartId, 'Saw', 1);
    await cartPage.openCartWithId(cartId);
    expect(await cartPage.calculateAddedItemsTotal()).toEqual(await cartPage.getCartTotal());

});

test('Verify remove item from cart', async ({ page, cartPage, apiHelper }) => {

    const cartId = await apiHelper.createCart();
    await apiHelper.addItemToCart(cartId, 'Saw', 1);
    await cartPage.openCartWithId(cartId);
    const removedProduct = await cartPage.removeItemFromCartAndReturnName('Saw');
    // Uses the data-test attribute to uniquely identify the title text element
    await expect(page.getByTestId('product-title').filter({ hasText: removedProduct })).toBeHidden({ timeout: 10000 });

})

test.only('Verify product quantity update', async ({ page, cartPage, apiHelper }) => {
    const cartId = await apiHelper.createCart();
    await apiHelper.addItemToCart(cartId, 'Saw', 1);
    await cartPage.openCartWithId(cartId);

    const name = CartData.product.name as existingTerm, qty = CartData.product.qty;
    const expectedData = await cartPage.updateQuantity(name, qty);

    expect(await page.locator('[data-test="product-quantity"]').inputValue()).toEqual(expectedData.qty.toString());

})