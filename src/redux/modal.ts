import { createSlice } from "@reduxjs/toolkit";

const modalstate = {
  data: {},
  mode: false,
  bid: "",
  contentowners: [],
  publishers: [],
};
const modalslice = createSlice({
  name: "modalslice",
  initialState: modalstate,
  reducers: {
    modaldata(state, actions) {
      state.data = actions.payload;
    },
    chgmode(state, actions) {
      state.mode = actions.payload;
    },
    setbid(state, actions) {
      state.bid = actions.payload;
    },
    setcontentowner(state, actions) {
      state.contentowners = actions.payload;
    },
    setpubisher(state, actions) {
      state.publishers = actions.payload;
    },
    cleanupdata(state) {
      state.data = {};
    },
  },
});
export const fetchonebook = (bookid: string): any => {
  return async (dispatch: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}book/${bookid}`
    );
    const data = await response.json();
    if (!response.ok) {
      console.log("error");
    }
    try {
      dispatch(modalactions.modaldata(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchcontentowner = (): any => {
  return async (dispatch: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}contentowner`);
    const data = await response.json();
    dispatch(modalactions.setcontentowner(data));
  };
};
export const fetchpublisher = (): any => {
  return async (dispatch: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}publisher`);
    const data = await response.json();
    dispatch(modalactions.setpubisher(data));
  };
};
export const modalactions = modalslice.actions;
export default modalslice;
