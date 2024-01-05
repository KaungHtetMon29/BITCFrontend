import { configureStore } from "@reduxjs/toolkit";
import bookslice from "./book";
import modalslice from "./modal";

const store = configureStore({
  reducer: { books: bookslice.reducer, modal: modalslice.reducer },
});
export default store;
