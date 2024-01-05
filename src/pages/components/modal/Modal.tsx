import { useEffect, useState } from "react";
import Btn from "../button/Btn";
import { bookdata, bookinput } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import modalslice, { fetchonebook, modalactions } from "@/redux/modal";
import { bookactions, fetchbook } from "@/redux/book";

export default function Modal({
  modal,
  setmodal,
}: {
  modal: boolean;
  setmodal: any;
}) {
  const handleInputChange = (e: any) => {
    console.log(e.target.value);
  };
  const [img, setimg] = useState("");
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.modal.bid);
  const iid = useSelector((state: any) => state.modal.bid);
  const cowners = useSelector((state: any) => state.modal.contentowners);
  const publishers = useSelector((state: any) => state.modal.publishers);
  const mdata: bookdata = useSelector((state: any) => state.modal.data);
  const [previd, setprevid] = useState("");

  const func = async (e: bookinput) => {
    console.log(e.cowner.value);
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}book`, {
      method: selector.length !== 0 ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookname: e.bookname.value,
        bookuniqid: e.bookuniqid.value,
        bprevid: previd,
        // contentowner: e.contentowner.value,
        contentowner: e.cowner.value,
        publisher: e.publisher.value,
        prize: e.prize.value,
        coverphoto: img,
      }),
    });
    const data2 = await data.json();
    console.log(data2);
  };
  const handlesubmit = async (e: any) => {
    e.preventDefault();
    func(e.target);
    console.log(img);
    setmodal(false);
  };
  const handleImgChg = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const bdata = e.target.result;
        setimg(bdata);
      };

      reader.readAsDataURL(file);
    }
    console.log(img);
  };
  useEffect(() => {
    setprevid(selector);
    if (selector.length !== 0) {
      dispatch(fetchonebook(selector));
    }
    return () => {
      dispatch(modalactions.cleanupdata());
    };
  }, []);
  return (
    <div className="w-full h-full inset-0 absolute justify-center items-center flex z-[999] backdrop-blur-sm">
      <div className="w-[500px] h-[400px] shadow-2xl p-8 bg-white rounded-2xl overflow-hidden">
        <h2 className="font-semibold mb-6">Add New Book</h2>
        <form
          className="flex flex-col gap-2"
          onSubmit={handlesubmit}
          method="Post"
        >
          <div className="flex items-center gap-2">
            <label className="flex grow">Add Book Name:</label>
            <div className="flex flex-col  w-7/12">
              <input
                required
                defaultValue={
                  selector.length !== 0
                    ? mdata.bookname !== null
                      ? mdata.bookname
                      : ""
                    : ""
                }
                type="text"
                name="bookname"
                className="border-2 rounded-md py-1 px-1 relative"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex grow">Add Book ID:</label>
            <div className="flex flex-col  w-7/12">
              <input
                required
                defaultValue={selector.length !== 0 ? mdata.book_uniq_idx : ""}
                type="text"
                name="bookuniqid"
                className="border-2 rounded-md py-1 px-1 relative"
              />
              {/* <div className="absolute mt-10 w bg-primary">hahahahaha</div> */}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex grow">Add Content Owner:</label>
            <div className="flex flex-col w-7/12">
              <select
                className="border-2 rounded-md py-1 px-1 relative w-full flex "
                name="cowner"
              >
                {cowners.map((e: any) => (
                  <option
                    key={e.name}
                    value={e.name}
                    selected={
                      selector.length !== 0
                        ? mdata.content_owner !== undefined &&
                          e.name === mdata.content_owner.name
                        : false
                    }
                  >
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex grow">Add Publisher:</label>
            <div className="flex flex-col w-7/12">
              <select
                className="border-2 rounded-md py-1 px-1 relative w-full flex "
                name="publisher"
              >
                {publishers.map((e: any) => (
                  <option
                    key={e.name}
                    value={e.name}
                    selected={
                      selector.length !== 0
                        ? mdata.publisher !== undefined &&
                          e.name === mdata.publisher.name
                        : false
                    }
                  >
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex grow">Add Prize:</label>
            <div className="flex flex-col  w-7/12">
              <input
                required
                defaultValue={selector.length !== 0 ? mdata.prize : ""}
                type="number"
                name="prize"
                className="border-2 rounded-md py-1 px-1 relative"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex grow">Add Cover Photo:</label>
            <div className="flex flex-col  w-7/12">
              <input
                className="border-2 rounded-md py-1 px-1 relative"
                placeholder="img"
                name="cover_photo"
                type="file"
                accept="image/*"
                onChange={handleImgChg}
              />
            </div>
          </div>

          <div className="w-full justify-end flex gap-2">
            <Btn
              name="Cancel"
              className="px-6 bg-primary"
              func={() => {
                setmodal(false), dispatch(modalactions.chgmode(false));
              }}
            />
            <input
              onClick={async () => {
                await dispatch(fetchbook());
                dispatch(bookactions.statuschg());
                setmodal(false), dispatch(modalactions.chgmode(false));
              }}
              type="submit"
              className={`py-1 rounded-lg text-base shadow-md px-6 bg-primary`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
