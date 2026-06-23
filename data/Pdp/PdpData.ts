import {  ProductDetails } from "../../interfaces/Product/ProductDetails";
import {  Message } from "../../interfaces/Product/Message";


export const PdpData = {
    productUrl: "https://practicesoftwaretesting.com/product/",
    expected: {

        productDetails:{
            productName: " Claw Hammer with Shock Reduction Grip ",
            price: 13.41
        } satisfies ProductDetails,
        message:{ 
            atcToastMessage: " Product added to shopping cart. "
        } satisfies Message
    }
}