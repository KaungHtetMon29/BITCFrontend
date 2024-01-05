import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "./components/Nav/nav";
import MainLayout from "./layouts/MainLayout";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { useEffect } from "react";
import { fetchcontentowner } from "@/redux/modal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
