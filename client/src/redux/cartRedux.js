import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    increaseSingleProductQuantity: (state, action) => {
      state.products[action.payload.index].quantity++;
      state.total = action.payload.total;
    },
    decreaseSingleProductQuantity: (state, action) => {
      if (state.quantity === 0) {
        return;
      }
      if (state.products[action.payload.index].quantity === 0) {
        return;
      }
      /*  console.log(state.products[action.payload.index].quantity - 1); */
      if (state.products[action.payload.index].quantity - 1 === 0) {
        state.quantity = state.quantity - 1;
        state.products[action.payload.index].quantity--;
        state.total = state.total - state.products[action.payload.index].price;
        const validProducts = state.products.filter((product) => {
          return product.quantity > 0;
        });
        state.products = validProducts;
        return;
      }
      state.products[action.payload.index].quantity--;
      state.total = state.total - state.products[action.payload.index].price;
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  increaseSingleProductQuantity,
  decreaseSingleProductQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
