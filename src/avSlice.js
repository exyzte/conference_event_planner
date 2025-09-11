import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
  name: "av",
  initialState: [
    {
        img: "https://pixabay.com/images/download/business-20031_640.jpg",
        name: "Projectors",
        cost: 200,
        quantity: 0,
    },
    {
        img: "https://smarthomesounds.sirv.com/live-wordpress/2022/06/marshall-bluetooth-speakers-buying-guide-blog-header.jpg",
        name: "Speaker",
        cost: 35,
        quantity: 0,
    },
    {
        img: "https://cdn.prod.website-files.com/655e0fa544c67c1ee5ce01c7/655e0fa544c67c1ee5ce1177_different-types-of-microphones-which-one-do-you-need-og.jpeg",
        name: "Microphones",
        cost: 45,
        quantity: 0,
    },
    {
        img: "https://www.shopedx.co.uk/cdn/shop/products/edx_Magnetic_Framed_Whiteboards_Pack_Of_4_54007_A.jpg?v=1662383221",
        name: "Whiteboards",
        cost: 80,
        quantity: 0,
    },
    {
        img: "https://www.ttfs.com.au/wp-content/uploads/2016/07/prohibition-construction-signs.jpg",
        name: "Signage",
        cost: 80,
        quantity: 0,
    },
  ],


  reducers: {
    incrementAvQuantity: (state, action) => {
        const item = state[action.payload];
        if(item){
            item.quantity++;
        }
    }
    },
    decrementAvQuantity: (state, action) => {
        const item = state[action.payload];
        if(item && item.quantity > 0) {
            item.quantity--;
        }
    },
  },
);

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

export default avSlice.reducer;
