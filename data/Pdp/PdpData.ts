import { Message, ProductDetails } from "../../interfaces/Pdp.model";

export const PdpData = {
    productUrl: "https://practicesoftwaretesting.com/product/",
    expected: {

        productDetails:{
            productName: " Claw Hammer with Shock Reduction Grip ",
            price: "13.41"
        } satisfies ProductDetails,
        message:{ 
            atcToastMessage: " Product added to shopping cart. "
        } satisfies Message
    }
}