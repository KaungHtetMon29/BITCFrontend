import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { tabtype } from "./types";

export default function Navbar() {
  return (
    <div className="bg-white shadow-md w-full sticky flex justify-center top-0 z-[9999]">
      <div className="xl:w-[1200px] lg:w-[1000px] md:w-[740px] sm:w-[600px] w-[340px] h-16 justify-center flex items-center">
        <div className="w-fit relative drop-shadow-md flex items-center gap-4">
          <Image
            src={logo}
            alt="logo"
            objectFit="contain"
            className="w-12 h-fit"
          />
          <h2 className="font-bold text-xl">WunZin</h2>
        </div>
        <div className="flex w-full justify-center gap-12">
          {tabs.map((e: tabtype) => (
            <Tab name={e.name} key={e.name} link={e.link} />
          ))}
        </div>

        <div>user</div>
      </div>
    </div>
  );
}
const tabs = [{ name: "Book List", link: "" }];
export const Tab = ({ link, name }: { link: string; name: string }) => {
  const router = useRouter();
  console.log(router.asPath.split("/")[1]);
  return (
    <div
      className={`flex ${
        link.toLowerCase() === router.asPath.split("/")[1]
          ? "bg-primary rounded-lg shadow-md"
          : "bg-none"
      }`}
    >
      <Link href={`/${link}`} className={`  px-6 py-2 `}>
        {name}
      </Link>
    </div>
  );
};
