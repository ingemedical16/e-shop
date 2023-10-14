import { createSlice } from "@reduxjs/toolkit";
import { productData } from "../static/data.jsx";

const initialState = {
  products: productData,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

//export const { } = productSlice.actions;

export default productSlice.reducer;
