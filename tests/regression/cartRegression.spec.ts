import{ expect} from '@playwright/test';
import{ test} from '../../fixtures/baseFixture';
import { PdpData } from '../../data/Pdp/PdpData';
import { PlpData } from '../../data/Plp/PlpData';

test('Verify cart total', async({page, apiHelper, cartPage})=>{
    
    const cartId = await apiHelper.createCart();
    await apiHelper.addItemToCart(cartId, PlpData.search.existing, 2);
    await apiHelper.addItemToCart(cartId, 'Saw', 1);
    await cartPage.openCartWithId(cartId);
    expect(await cartPage.calculateAddedItemsTotal()).toEqual(await cartPage.getCartTotal());
    
})