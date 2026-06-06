import {test as base, Page, request} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {ProductListing_SearchPage} from '../pages/ProductListing_searchPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { OrderDetailsPage } from '../pages/OrderDetailsPage';
import { OrderHistoryPage } from '../pages/OrderHistoryPage';
import { ApiHelper } from '../utils/ApiHelper';

interface MyFixtures {
    loginPage: LoginPage;
    productListing_searchPage: ProductListing_SearchPage;
    productDetailsPage: ProductDetailsPage;
    cartPage: CartPage;
    orderHistoryPage: OrderHistoryPage;
    orderDetailsPage: OrderDetailsPage;
    apiHelper: ApiHelper;
}


export const test= base.extend<MyFixtures>({
    loginPage: async ({page}, use)=>{
        await use(new LoginPage(page));
    },
    productListing_searchPage: async ({page}, use)=>{
        await use(new ProductListing_SearchPage(page));
    },
    productDetailsPage:async ({page}, use)=>{
        await use(new ProductDetailsPage(page));
    },
    cartPage: async ({page}, use)=>{
        await use(new CartPage(page));
    },
    orderHistoryPage: async ({page}, use)=>{
        await use(new OrderHistoryPage(page));
    },
    orderDetailsPage: async ({page}, use)=>{
        await use(new OrderDetailsPage(page));
    },
    apiHelper: async({page, request}, use)=>{
        await use(new ApiHelper(request))
    }

})