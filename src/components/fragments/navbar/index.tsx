import CustomButton from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiSolidCart } from "react-icons/bi";

const Navbar = () => {
  const { pathname, asPath } = useRouter();
  const session: any = useSession();
  const userData = session?.data?.user;

  return (
    <nav className="sticky top-0 left-0 w-full max-h-[60px] px-14 py-4 flex items-center justify-between bg-primary-red text-white">
      <h1 className="text-3xl font-medium italic">Cateringin</h1>

      {userData ? (
        <div className="flex items-center gap-5">
          {userData?.role === "member" && (
            <BiSolidCart className="text-4xl cursor-pointer" />
          )}
          <CustomButton
            label="Logout"
            color="white"
            variant="outlined"
            onSubmit={() =>
              signOut({
                callbackUrl: userData?.role === "admin" ? pathname : asPath,
              })
            }
          />
        </div>
      ) : (
        <Link href={"/auth/login"}>
          <CustomButton label="Login" color="white" variant="outlined" />
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
