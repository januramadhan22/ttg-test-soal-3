import CustomButton from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  BiSolidPackage,
  BiSolidUserAccount,
  BiSolidDashboard,
  BiSolidLogOut,
  BiSolidUser,
} from "react-icons/bi";

const sideItems = [
  {
    label: "Products",
    icon: <BiSolidPackage />,
    url: "/admin/products",
  },
];

const Sidebar = () => {
  const { pathname } = useRouter();
  const session: any = useSession();
  const userData = session?.data?.user;

  return (
    <div className="sticky top-4 left-4 w-full h-[calc(100vh-72px)] py-4 px-2 flex flex-col justify-between gap-3 rounded-md border border-primary-red bg-primary-red bg-opacity-10 backdrop-blur shadow-md">
      <div className="w-full flex flex-col gap-3">
        <h1
          id="role"
          className="hidden lg:block text-2xl font-medium text-center leading-tight uppercase text-primary-red"
        >
          Admin Panel
        </h1>
        <h1
          id="role"
          title="Admin"
          className="flex justify-center lg:hidden text-2xl font-medium text-center leading-tight uppercase text-primary-red"
        >
          <BiSolidUser />
        </h1>
        <div
          id="divider"
          className="w-full h-[1px] bg-primary-red bg-opacity-30"
        />
        <div className="w-full py-2 flex flex-col gap-2">
          {sideItems.map((item, index) => (
            <Link key={index} href={item?.url}>
              <div
                className={`py-1 md:py-3 px-1 md:px-4 flex items-center justify-center md:justify-start gap-2 rounded tracking-wider cursor-pointer border border-transparent font-medium hover:border-primary-red hover:brightness-90 transition-all ease-in ${
                  pathname === item?.url
                    ? "bg-primary-red text-white"
                    : "bg-transparent text-primary-red"
                }`}
              >
                <span className="text-2xl">{item?.icon}</span>
                <span className="hidden lg:block text-lg">{item?.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {userData && (
        <button
          className={`py-1 md:py-3 px-1 md:px-4 flex items-center justify-center gap-2 rounded tracking-wider cursor-pointer border border-transparent font-medium hover:border-primary-red hover:brightness-90 transition-all ease-in bg-primary-red text-white`}
          onClick={() => signOut({ callbackUrl: pathname })}
        >
          <span className="text-2xl">
            <BiSolidLogOut />
          </span>
          <span className="hidden lg:block text-lg">Logout</span>
        </button>
      )}
    </div>
  );
};

export default Sidebar;
