import Image from "next/image";
import { Inter } from "next/font/google";
import Btn from "./components/button/Btn";
import Modal from "./components/modal/Modal";
import DataTable from "./components/table/Datatable";
import { bookdata } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletebook, fetchbook } from "@/redux/book";
import { fetchcontentowner, fetchpublisher } from "@/redux/modal";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }: { data: bookdata[] }) {
  const dispatch = useDispatch();
  const [trigger, settrigger] = useState(false);
  const bookchg = useSelector((state: any) => state.books.status);
  const books = useSelector((state: any) => state.books.books);
  const selector = useSelector((state: any) => state.modal.contentowners);
  useEffect(() => {
    dispatch(fetchcontentowner());
    dispatch(fetchpublisher());
  }, []);
  useEffect(() => {
    dispatch(fetchbook());
    console.log("l");
  }, [trigger, bookchg]);
  return (
    <>
      <div className="w-full overflow-auto flex my-4 max-h-[500px] rounded-xl border-b shadow-lg">
        <DataTable data={books} settrigger={settrigger} />
      </div>
    </>
  );
}

// export const getServerSideProps = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}`);
//   const data = await res.json();
//   console.log(data);
//   return { props: { data: data } };
// };
