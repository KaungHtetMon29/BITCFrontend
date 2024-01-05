import { useState } from "react";
import Navbar from "../components/Nav/nav";
import Btn from "../components/button/Btn";
import Modal from "../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { modalactions } from "@/redux/modal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modal, setmodal] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.modal.mode);
  return (
    <div className="h-full w-full">
      <Navbar />
      {(modal || selector) && <Modal modal={modal} setmodal={setmodal} />}

      <div className="relative xl:w-[1200px] lg:-[1000px] md:w-[740px] sm:w-[600px] w-[340px] flex justify-center mx-auto">
        {children}
      </div>
      <div className="xl:w-[1200px] lg:-[1000px] md:w-[740px] sm:w-[600px] w-[340px] flex justify-end mx-auto">
        <Btn
          className="w-32 py-2  bg-primary"
          name="Add New"
          func={() => {
            setmodal(true), dispatch(modalactions.setbid(""));
          }}
        />
      </div>
    </div>
  );
}
