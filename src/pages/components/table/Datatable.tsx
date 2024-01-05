import { bookdata } from "@/types";
import Btn from "../button/Btn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletebook, fetchbook } from "@/redux/book";
import { modalactions } from "@/redux/modal";

export default function DataTable({
  data,
  settrigger,
}: {
  data: bookdata[];
  settrigger: any;
}) {
  const dispatch = useDispatch();
  return (
    <table className="relative w-full rounded-xl table-fixed">
      <thead>
        <tr className="drop-shadow-lg">
          <th className="sticky top-0 text-start pl-8 w-[100px] bg-primary h-12">
            Idx
          </th>
          <th className="sticky top-0 text-start w-[150px] bg-primary">
            Book Name
          </th>
          <th className="sticky top-0 text-start w-[200px] bg-primary">
            Content Owner
          </th>
          <th className="sticky top-0 text-start w-[200px] bg-primary">
            Publisher
          </th>
          <th className="sticky top-0 text-start pr-8 w-[180px] bg-primary">
            Created Date
          </th>
          <th className="sticky top-0 text-start pr-8 w-[170px] bg-primary"></th>
        </tr>
      </thead>
      <tbody className="divide-y h-fit">
        {data.map((e: bookdata) => (
          <tr className="h-16">
            <td className="text-start pl-8">{e.idx}</td>
            <td className=" text-start">{e.bookname}</td>
            <td className=" text-start">{e.content_owner.name}</td>
            <td className=" text-start pr-8">{e.publisher.name}</td>
            <td className=" text-start pr-8">
              {e.created_timetick !== null &&
                `${new Date(e.created_timetick).getDate()}-${
                  new Date(e.created_timetick).getMonth() + 1
                }-${new Date(e.created_timetick).getFullYear()}`}
            </td>
            <td>
              <div className="flex gap-2 pr-8">
                <Btn
                  name="Edit"
                  className="bg-green-500 text-white w-20"
                  func={async () => {
                    dispatch(modalactions.chgmode(true));
                    dispatch(modalactions.setbid(e.book_uniq_idx));
                  }}
                />
                <Btn
                  name="Delete"
                  className="bg-red-500 text-white  w-20"
                  func={async () => {
                    await dispatch(deletebook(e.idx));
                    settrigger((prev: any) => !prev);
                  }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// export const deletefunc = async (idx: number) => {
//   console.log("clicked");
//   await fetch(`${process.env.NEXT_PUBLIC_URL}/${idx}`, {
//     method: "Delete",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };
