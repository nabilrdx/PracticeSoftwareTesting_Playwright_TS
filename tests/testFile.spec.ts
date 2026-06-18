// import {test, expect, request} from '@playwright/test';
// import { ApiHelper } from '../utils/ApiHelper';

// test('test file', async ({page}) => {
//     const apiContext = await request.newContext();
//     let apiHelper = new ApiHelper(apiContext);
//     const call = await apiContext.post('https://api.practicesoftwaretesting.com/carts')
//     const callRespJson = await call.json();
//     console.log(callRespJson.id);

//     const callAtcApi = await apiContext.post(`https://api.practicesoftwaretesting.com/carts/${callRespJson.id}`,
//         {
//             data:{
//                 product_id: await apiHelper.getProductId(),
//                 quantity: 1
//             }
//         }
//     );
//     const atcResp= await callAtcApi.json();
//     console.log(atcResp);

// })