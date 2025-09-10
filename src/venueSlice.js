// venueSlice.js
import { createSlice } from "@reduxjs/toolkit";

const ROOM_MAX_CAPACITY = {
    "Auditorium Hall (Capacity 200)": 3,
    "Conference Room (Capacity:15)": 40,
    "Presentation Room (Capacity:50)": 12,
    "Large Meeting Room (Capacity:10)": 20,
    "Small Meeting Room (Capacity:5)": 15,
}
export const venueSlice = createSlice({
  name: "venue",
  initialState: [
    {
      img: "https://cdn.prod.website-files.com/61cdc308bda4b01d29c5fc56/62fd7e700c6948757083cb10_empty-conference-room.jpg",
      name: "Conference Room (Capacity:15)",
      cost: 3500,
      quantity: 0,
    },
    {
      img: "https://images.pexels.com/photos/5026349/pexels-photo-5026349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Auditorium Hall (Capacity:200)",
      cost: 5500,
      quantity: 0,
    },
    {
      img: "https://fredhotelsallink-live-df2cb5dada9a4075a-471e907.divio-media.net/filer_public_thumbnails/filer_public/42/10/42102d33-7a57-42d9-9793-9db866041800/fredtschanz-sitzungszimmer-allink_h8a4382.jpg__984x656_q75_HIGH_RESOLUTION_crop-smart_subsampling-2_upscale.jpg",
      name: "Presentation Room (Capacity:50)",
      cost: 700,
      quantity: 0,
    },
    {
      img: "https://www.lakdi.com/cdn/shop/files/Conference_Meeting_with_10_Person_Seating_Large_Size_Table_for_Offices_-_-3750284.jpg?v=1755849664",
      name: "Large Meeting Room (Capacity:10)",
      cost: 900,
      quantity: 0,
    },
    {
      img: "https://www.coalesse.com/wp-content/uploads/2019/05/rsz_1rsz_1rsz_1rsz_118-0101935.jpg",
      name: "Small Meeting Room (Capacity:5)",
      cost: 1100,
      quantity: 0,
    },
  
  ],
  reducers: {
   
    incrementQuantity: (state, action) {
        const { payload: index } = action;
        const roomName = state[index].name;
        const maxQuantity = ROOM_MAX_CAPACITY[roomName];
        if (state[index].quantity >= maxQuantity) {
            return;
        } state[index].quantity++;
    },
    decrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = venueSlice.actions;

export default venueSlice.reducer;
