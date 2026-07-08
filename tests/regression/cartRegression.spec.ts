import{ expect} from '@playwright/test';
import{ test} from '../../fixtures/baseFixture';
import { PdpData } from '../../data/Pdp/PdpData';
import { PlpData } from '../../data/Plp/PlpData';
import { ApiHelper } from '../../utils/ApiHelper';

test('Verify cart total', async({page, apiHelper, cartPage})=>{
    
    const cartId = await apiHelper.createCart();
    await apiHelper.addItemToCart(cartId, PlpData.search.existing, 2);
    await apiHelper.addItemToCart(cartId, 'Saw', 1);
    await cartPage.openCartWithId(cartId);
    expect(await cartPage.calculateAddedItemsTotal()).toEqual(await cartPage.getCartTotal());
    
});

test.only('Verify remove item from cart', async({page, cartPage, apiHelper})=>{

const cartId = await apiHelper.createCart();
await apiHelper.addItemToCart(cartId, 'Saw', 1);
await cartPage.openCartWithId(cartId);
const removedProduct = await cartPage.removeItemFromCartAndReturnName('Saw');
await expect(page.getByText(removedProduct)).toBeHidden();
})