import { createSlice } from "@reduxjs/toolkit";

const bookstate = { books: [], localbooks: [], status: false, update: false };
const bookslice = createSlice({
  name: "bookslice",
  initialState: bookstate,
  reducers: {
    store(state, actions) {
      state.books = actions.payload;
    },
    statuschg(state) {
      state.status = !state.status;
    },
    setlocal(state, actions) {
      state.localbooks = state.books;
    },
  },
});

export const fetchbook = (): any => {
  return async (dispatch: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}book`);
    const data = await response.json();
    if (!response.ok) {
      console.log("error");
    }
    try {
      dispatch(bookactions.store(data));
    } catch (error) {}
  };
};
export const deletebook = (idx: number): any => {
  return async (dispatch: any) => {
    console.log("clicked");
    await fetch(`${process.env.NEXT_PUBLIC_URL}book/${idx}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};
export const bookactions = bookslice.actions;
export default bookslice;
